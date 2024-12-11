import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon, MapPinIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getSingleEvent } from "@/action/events";
import { Badge } from "@/components/ui/badge";
import { getComments } from "@/action/comment";
import { ScrollArea } from "@/components/ui/scroll-area";
import GoingButton from "@/components/EventGoingBtn.jsx/EventGoingBtn";
import CommentForm from "@/components/AddCommentBtn/AddCommentBtn";
import { auth } from "../../../../auth";

dayjs.extend(relativeTime);

export default async function EventDetailsPage({ params }) {
  const session = await auth();
  const eventData = await getSingleEvent(params.id);
  const commentsData = await getComments(params.id);

  if (!eventData.event) {
    notFound();
  }

  const { event } = eventData;
  const { comments } = commentsData;
  console.log("commant=>", commentsData);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isGoingToEvent =
    session && event.going.some((user) => user._id === session.user._id);

  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="relative w-full h-64 mb-4">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <Badge className="mb-2 w-fit">{event.category.title}</Badge>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <CalendarIcon className="text-muted-foreground" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <ClockIcon className="text-muted-foreground" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <MapPinIcon className="text-muted-foreground" />
            <span>{event.address}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={event.createdBy.profileImg} />
              <AvatarFallback>
                {event.createdBy.fullname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{event.createdBy.fullname}</p>
              <p className="text-sm text-muted-foreground">Event Organizer</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Attendees</h3>
            <div className="flex flex-wrap gap-2">
              {event?.going?.map((user) => (
                <Avatar key={user._id} title={user.fullname}>
                  <AvatarImage src={user.profileImg} />
                  <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          {session ? (
            <Suspense
              fallback={
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </Button>
              }
            >
              <GoingButton
                eventId={params.id}
                userId={session.user._id}
                isInitiallyGoing={isGoingToEvent}
              />
            </Suspense>
          ) : (
            <Link className="w-full" href="/signin">
              <Button className="w-full">Login to participate in Event</Button>
            </Link>
          )}

          {session && (
            <div className="w-full space-y-4 mt-4">
              <h2 className="text-xl font-semibold">Comments</h2>
              <Suspense
                fallback={
                  <div className="h-[100px] flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
              >
                <CommentForm eventId={params.id} userId={session.user._id} />
              </Suspense>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-start space-x-3 bg-muted p-3 rounded-lg mb-4"
                    >
                      <Avatar title={comment.user.fullname}>
                        <AvatarImage src={comment.user.profileImg} />
                        <AvatarFallback>
                          {comment.user.fullname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">
                            {comment.user.fullname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dayjs(comment.createdAt).format(
                              "MMM D, YYYY h:mm A"
                            )}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </ScrollArea>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

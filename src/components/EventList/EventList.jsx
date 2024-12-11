"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddEventForm from "../EventSheat/EventSheat";

export default function EventList({ session, events, categories }) {
  const [eventsList, setEventsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    // Set initial events and categories from props
    setEventsList(events.events || []);
    setCategoriesList([
      { _id: "All", title: "All" },
      ...(categoriesList.categories || []),
    ]);
    setIsLoading(false);
  }, [events, categories]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);

    const params = new URLSearchParams(searchParams);
    if (categoryId && categoryId !== "All") {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // const filteredEvents =
  //   selectedCategory === "All"
  //     ? events
  //     : events.filter((event) => event.category._id === selectedCategory);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>

          <div className="flex gap-5">
            <Select onValueChange={handleSelectCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesList.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AddEventForm session={session} categories={categories} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="h-48 w-full rounded-md animate-pulse" />
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-6 w-3/4 rounded animate-pulse" />
                      <Skeleton className="h-4 w-1/2 rounded animate-pulse" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Skeleton className="h-4 w-full rounded animate-pulse mb-2" />
                      <Skeleton className="h-4 w-3/4 rounded animate-pulse" />
                    </CardContent>
                    <CardFooter className="space-y-2">
                      <Skeleton className="h-10 w-full rounded-md animate-pulse" />
                    </CardFooter>
                  </Card>
                ))
            : eventsList.map((event) => (
                <Card key={event._id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.category.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video w-full mb-4">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        className="object-cover w-full h-full rounded-md"
                        width={100}
                        height={200}
                      />
                    </div>
                    <p className="flex items-center mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {new Date(event.startDate).toLocaleDateString()}{" "}
                      {event.startTime} - {event.endTime}
                    </p>
                    <p className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      {event.address}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src={event.createdBy.profileImg}
                        alt={event.createdBy.fullname}
                        className="w-8 h-8 rounded-full mr-2"
                        width={100}
                        height={200}
                      />
                      <span className="text-sm">
                        {event.createdBy.fullname}
                      </span>
                    </div>
                    <Link href={`/Events/${event._id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}

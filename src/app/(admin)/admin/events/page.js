import React from "react";
import { getEvents } from "@/action/events";
import { getCategoryData } from "@/action/category";
import EventPage from "@/components/EventSheat/EventSheat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "../../../../../auth";
import { Plus, Search, Calendar, MapPin, Users } from "lucide-react";
import Dropdown from "@/components/EventDropdown/EventDropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

async function AdminEventsTable() {
  const { events } = await getEvents();
  const session = await auth();
  const { categories } = await getCategoryData();

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Events</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 max-w-sm bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search events..."
              type="search"
            />
          </div>
          <Dropdown
            label="Filter by Category"
            items={[
              {
                label: "All Categories",
              },
              ...categories.map((category) => ({
                label: category.title,
              })),
            ]}
          />
          <EventPage session={session} categories={categories} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Event</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Date & Time</TableHead>
              <TableHead className="text-white">Location</TableHead>
              <TableHead className="text-white">Organizer</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event._id} className="hover:bg-gray-700">
                <TableCell className="font-medium text-white">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <span>{event.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {event.category.title}
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString()} -{" "}
                      {new Date(event.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {event.startTime} - {event.endTime}
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.address}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={event.createdBy.profileImg}
                      alt={event.createdBy.fullname}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span>{event.createdBy.fullname}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminEventsTable;

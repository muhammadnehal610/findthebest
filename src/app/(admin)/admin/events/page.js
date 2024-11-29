import React from "react";
import { getEvents } from "@/action/events";
import { getCategoryData } from "@/action/category";
import EventPage from "@/components/EventSheat/EventSheat";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { auth } from "../../../../../auth";
import AdminEventCard from "@/components/EventCard/EventCard";
import { Plus } from "lucide-react";
import Dropdown from "@/components/EventDropdown/EventDropdown";

async function Events() {
  const { events } = await getEvents();
  const session = await auth();
  const { categories } = await getCategoryData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Events</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            className="max-w-sm bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            placeholder="Search events..."
            type="search"
          />
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events?.map((event) => (
          <AdminEventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;

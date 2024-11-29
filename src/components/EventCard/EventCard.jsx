import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  Edit,
  Trash2,
} from "lucide-react";

const AdminEventCard = ({ event }) => {
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700">
      <div className="relative h-48 w-full">
        <Image
          src={event.thumbnail}
          alt={event.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-white">{event.title}</h2>
        <p className="text-sm text-gray-400 mb-4">
          {event.discription?.slice(0, 100)}
          {event.discription && event.discription.length > 100 ? "..." : ""}
        </p>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {event.startDate}
        </div>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <ClockIcon className="w-4 h-4 mr-2" />
          {event.startTime} - {event.endTime}
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {event.address}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-700 flex justify-between items-center">
        <span className="text-sm font-medium text-blue-400">
          {event.category.title}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-600 text-gray-200 hover:bg-gray-500"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminEventCard;

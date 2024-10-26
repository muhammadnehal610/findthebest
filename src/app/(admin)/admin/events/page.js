import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const events = [
  {
    title: "birthday",
    dispcription: "happy birthday to you",
    location: "Karachi",
    thumbnil:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: new Date().toLocaleString(),
  },
  {
    title: "Circit",
    dispcription: "enjoy the circit",
    location: "HAydrabad",
    thumbnil:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: new Date().toLocaleString(),
  },
  {
    title: "Tenes",
    dispcription: "Play the tenes",
    location: "Karachi",
    thumbnil:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: new Date().toLocaleString(),
  },
];
function Events() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold">Events</h1>
      <Table>
        <TableCaption>A list of your Events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnil</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Discription</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.title}>
              <TableCell className="font-medium">
                <Image
                  width={50}
                  height={50}
                  src={event.thumbnil}
                  alt={event.title}
                />
              </TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.dispcription}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Events;

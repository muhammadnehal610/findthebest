import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCatagory } from "@/components/AddCatagory/AddCatagory";

const catagory = [
  {
    title: "birthday",
    dispcription: "happy birthday to you",

    thumbnil:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Circit",
    dispcription: "enjoy the circit",

    thumbnil:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tenes",
    dispcription: "Play the tenes",

    thumbnil:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
function Events() {
  return (
    <div className="min-h-screen container mx-auto">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold">catagory</h1>
        <AddCatagory />
      </div>
      <Table>
        <TableCaption>A list of your catagory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnil</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Discription</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catagory.map((catagory) => (
            <TableRow key={catagory.title}>
              <TableCell>
                <Image
                  width={50}
                  height={50}
                  src={catagory.thumbnil}
                  alt={catagory.title}
                />
              </TableCell>
              <TableCell>{catagory.title}</TableCell>
              <TableCell>{catagory.dispcription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Events;

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

const users = [
  {
    name: "Nehal",
    email: "muhammdnehal610@gmail.com",
    location: "Karachi",
    profileImg:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    event: 4,
  },
  {
    name: "Anus",
    email: "muhammdanus610@gmail.com",
    location: "Karachi",
    profileImg:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    event: 4,
  },
  {
    name: "Bilal",
    email: "bilal123@gmail.com",
    location: "Karachi",
    profileImg:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    event: 4,
  },
  {
    name: "Ubaid",
    email: "ubaidraza610@gmail.com",
    location: "Karachi",
    profileImg:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    event: 4,
  },
];
function Users() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold">Users</h1>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead className="w-[100px]">Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Events</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((users) => (
            <TableRow key={users.name}>
              <TableCell className="font-medium">
                <image
                  width={50}
                  height={50}
                  src={users.profileImg}
                  alt={users.name}
                />
              </TableCell>
              <TableCell>{users.name}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.location}</TableCell>
              <TableCell>{users.event}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;

import React from "react";
import Image from "next/image";
import { getUsers } from "@/action/users";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, UserPlus, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function Users() {
  const { users } = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Input
            placeholder="Search users..."
            className="max-w-sm bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="text-gray-400">
            A list of your users.
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-[100px] text-gray-300">Profile</TableHead>
              <TableHead className="text-gray-300">Full Name</TableHead>
              <TableHead className="hidden md:table-cell text-gray-300">
                Email
              </TableHead>
              <TableHead className="hidden md:table-cell text-gray-300">
                Location
              </TableHead>
              <TableHead className="hidden lg:table-cell text-gray-300">
                Address
              </TableHead>
              <TableHead className="hidden lg:table-cell text-gray-300">
                Role
              </TableHead>
              <TableHead className="text-right text-gray-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id} className="border-b border-gray-700">
                <TableCell>
                  <Image
                    width={40}
                    height={40}
                    src={
                      user.profileImg || "/placeholder.svg?height=40&width=40"
                    }
                    alt={user.fullname}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-white">
                  {user.fullname}
                  {user.bio && (
                    <p className="text-xs text-gray-400 mt-1 truncate max-w-[200px]">
                      {user.bio}
                    </p>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-300">
                  {user.email}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-300">
                  {user.location ? (
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location.lat.toFixed(2)},{" "}
                      {user.location.long.toFixed(2)}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-300">
                  {user.address || "N/A"}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-300">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin" ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit user</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete user</span>
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

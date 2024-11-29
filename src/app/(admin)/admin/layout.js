import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderTree,
  Layers,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) return redirect("/signin");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback>
                      {session.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{session.user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6 bg-gray-800 p-1 rounded-lg">
              <Link href="/admin/dashboard" className="w-full">
                <TabsTrigger
                  value="dashboard"
                  className="w-full data-[state=active]:bg-gray-700"
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/users" className="w-full">
                <TabsTrigger
                  value="users"
                  className="w-full data-[state=active]:bg-gray-700"
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/events" className="w-full">
                <TabsTrigger
                  value="events"
                  className="w-full data-[state=active]:bg-gray-700"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Events</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/categories" className="w-full">
                <TabsTrigger
                  value="categories"
                  className="w-full data-[state=active]:bg-gray-700"
                >
                  <FolderTree className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Categories</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/subcategories" className="w-full">
                <TabsTrigger
                  value="subcategories"
                  className="w-full data-[state=active]:bg-gray-700"
                >
                  <Layers className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Subcategories</span>
                </TabsTrigger>
              </Link>
            </TabsList>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <TabsContent value="dashboard">{children}</TabsContent>
              <TabsContent value="users">{children}</TabsContent>
              <TabsContent value="events">{children}</TabsContent>
              <TabsContent value="categories">{children}</TabsContent>
              <TabsContent value="subcategories">{children}</TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;

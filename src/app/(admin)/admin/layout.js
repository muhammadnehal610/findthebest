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
} from "lucide-react";

async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) return redirect("/signin");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
              <Link href="/admin/dashboard" className="w-full">
                <TabsTrigger value="dashboard" className="w-full">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/users" className="w-full">
                <TabsTrigger value="users" className="w-full">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/events" className="w-full">
                <TabsTrigger value="events" className="w-full">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Events</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/categories" className="w-full">
                <TabsTrigger value="categories" className="w-full">
                  <FolderTree className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Categories</span>
                </TabsTrigger>
              </Link>
              <Link href="/admin/subcategories" className="w-full">
                <TabsTrigger value="subcategories" className="w-full">
                  <Layers className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Subcategories</span>
                </TabsTrigger>
              </Link>
            </TabsList>
            <div className="bg-white shadow rounded-lg p-6">
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

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

function layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Find the best</title>
      </head>
      <body>
        <Tabs defaultValue="admin" className="w-full mx-auto text-3xl">
          <TabsList className="text-4xl w-full">
            <Link href={"/admin/dashboard"}>
              {" "}
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>{" "}
            </Link>
            <Link href={"/admin/users"}>
              <TabsTrigger value="users">Users</TabsTrigger>
            </Link>
            <Link href={"/admin/events"}>
              <TabsTrigger value="events">Events</TabsTrigger>{" "}
            </Link>
            <Link href={"/admin/catageries"}>
              <TabsTrigger value="catageries">Catageries</TabsTrigger>{" "}
            </Link>
            <Link href={"/admin/subCatageries"}>
              <TabsTrigger value="subcatageries">SubCatageries</TabsTrigger>{" "}
            </Link>
          </TabsList>
          <TabsContent value="admin">{children}</TabsContent>
          <TabsContent value="dashboard">{children}</TabsContent>
          <TabsContent value="users">{children}</TabsContent>
          <TabsContent value="events">{children}</TabsContent>
          <TabsContent value="catageries">{children}</TabsContent>
          <TabsContent value="subcatageries">{children}</TabsContent>
        </Tabs>
      </body>
    </html>
  );
}

export default layout;

import React from "react";
import Image from "next/image";
import { getCategoryData } from "@/action/category";
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
import { Edit, Trash2 } from "lucide-react";
import { AddCategory } from "@/components/AddCatagory/AddCatagory";

export default async function Category() {
  const { categories } = await getCategoryData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <AddCategory />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of your categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Image
                    width={50}
                    height={50}
                    src={category.thumbnail}
                    alt={category.title}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{category.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {category.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
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

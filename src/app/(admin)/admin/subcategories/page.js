import { getCategoryData } from "@/action/category";
import { getSubCategoryData } from "@/action/subcategory";
import { AddSubCategory } from "@/components/AddSubCatagory/AddSubCatagory";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function SubCategories({ searchParams }) {
  const params = await searchParams;
  const subcategories = await getSubCategoryData(params?.category);
  const { categories } = await getCategoryData();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Subcategories</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Input
                type="search"
                placeholder="Search subcategories..."
                className="max-w-[300px]"
              />
            </div>
            <CategoryDropdown categories={categories} />
            <AddSubCategory categories={categories} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Thumbnail</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subcategories && subcategories.length > 0 ? (
                  subcategories.map((subCat) => (
                    <TableRow key={subCat._id}>
                      <TableCell>
                        <Image
                          src={subCat.thumbnail}
                          alt={subCat.title}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {subCat.category?.title}
                      </TableCell>
                      <TableCell>{subCat.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                        {subCat.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Edit subcategory"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Delete subcategory"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No subcategories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

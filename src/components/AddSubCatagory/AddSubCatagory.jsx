"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addSubCategoryData } from "@/action/subcategory";
import { uploadFile } from "@/action/upload";

export function AddSubCategory({ categories }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleAddSubCategory(formData) {
    const result = await addSubCategoryData({
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      thumbnail: await uploadFile(formData),
    });

    if (result.success) {
      toast({
        title: "Success",
        description: "Subcategory added successfully",
        variant: "success",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setOpen(false);
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add subcategory",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Subcategory</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
          <DialogDescription>
            Add a new subcategory here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAddSubCategory} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Sports"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="About the subcategory"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select name="category" required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Thumbnail
            </Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept="image/*"
              className="col-span-3"
              required
            />
          </div>
          <Button type="submit" className="ml-auto">
            Add Subcategory
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

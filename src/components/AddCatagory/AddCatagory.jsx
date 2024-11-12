"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategoryData } from "@/action/category";
import { uploadFile } from "@/action/upload";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRef, useState } from "react";

export function AddCategory() {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a new category for events here. Click save when {`you're`}{" "}
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Category</DrawerTitle>
          <DrawerDescription>
            Add a new category for events here. Click save when {`you're`} done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, setOpen }) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const { toast } = useToast();

  const addCategory = async (formData) => {
    setLoading(true);

    try {
      const title = formData.get("title");
      const description = formData.get("description");
      const thumbnail = formData.get("thumbnail");
      const uploadImage = await uploadFile(formData);

      const obj = {
        title,
        description,
        thumbnail: uploadImage,
      };
      await addCategoryData(obj);
      toast({
        title: "Success",
        description: "Category added successfully",
        variant: "success",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      formRef.current.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "error",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} action={addCategory} className={className}>
      <div className="grid gap-4 py-4">
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
            placeholder="About the category"
            className="col-span-3"
            required
          />
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
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </Button>
      </DialogFooter>
    </form>
  );
}

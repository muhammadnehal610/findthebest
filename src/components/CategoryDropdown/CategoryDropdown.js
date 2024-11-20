"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function CategoryDropdown({ categories }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  function handleSelectCategory(category) {
    const params = new URLSearchParams(searchParams);
    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="category-select">Filter by Category</Label>
      <Select onValueChange={handleSelectCategory} value={selectedCategory}>
        <SelectTrigger id="category-select" className="w-[200px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use server";

import { revalidatePath } from "next/cache";

export const addCategoryData = async (obj) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}api/catagories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to add category");
    }

    console.log("Category added successfully");
    revalidatePath("/admin/categories"); // Correct path
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

export const getCategoryData = async () => {
  let categories = await fetch(`${process.env.BASE_URL}api/catagories`);
  categories = (await categories).json();
  console.log("categories fetch successfully");

  return categories;

  revalidatePath("/admin/catageries");
};

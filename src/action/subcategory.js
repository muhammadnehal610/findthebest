"use server";

import { revalidatePath } from "next/cache";

export async function addSubCategoryData(obj) {
  try {
    const response = await fetch(`${process.env.BASE_URL}api/subcatagories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add subcategory");
    }

    const result = await response.json();
    console.log("SubCategory added successfully:", result);
    revalidatePath("/admin/categories");
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding Subcategory:", error);
    return { success: false, error: error.message };
  }
}

export async function getSubCategoryData(category) {
  try {
    const url = new URL(`${process.env.BASE_URL}api/subcatagories`);
    if (category) {
      url.searchParams.append("category", category);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories");
    }

    const data = await response.json();
    console.log("Subcategories fetched successfully:", data);
    return data.subcategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
}

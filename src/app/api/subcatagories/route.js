import { connectDB } from "@/lib/db/connectDB";
import { SubCategoryModal } from "@/lib/modals/subCatagory";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const query = {};

  if (searchParams.get("category")) {
    query.category = searchParams.get("category");
  }

  try {
    const subcategories = await SubCategoryModal.find(query).populate(
      "category",
      "title"
    );
    return Response.json(
      {
        message: "Subcategories fetched successfully",
        subcategories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return Response.json(
      {
        message: "Failed to fetch subcategories",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const obj = await request.json();
    let newSubCategory = new SubCategoryModal(obj);
    await newSubCategory.save();

    return Response.json(
      {
        message: "Subcategory added successfully",
        subcategory: newSubCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding subcategory:", error);
    return Response.json(
      {
        message: "Failed to add subcategory",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  // Implement update logic here
  return Response.json({ message: "Not implemented" }, { status: 501 });
}

export async function DELETE(request) {
  // Implement delete logic here
  return Response.json({ message: "Not implemented" }, { status: 501 });
}

import { connectDB } from "@/lib/db/connectDB";
import { CategoryModel } from "@/lib/modals/catagory";

export async function GET(request) {
  await connectDB();
  const categories = await CategoryModel.find();
  return Response.json(
    {
      msg: "Categories Fetched Successfully",
      categories,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newCategory = new CategoryModel(obj);
  await newCategory.save();

  return Response.json(
    {
      msg: "Category Added Successfully ",
      category: newCategory,
    },
    { status: 201 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}

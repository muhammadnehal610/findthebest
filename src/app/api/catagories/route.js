import { connectDB } from "@/lib/db/connectDB";
import { CategoryModal } from "@/lib/modals/category";

export async function GET(request) {
  await connectDB();
  const categories = await CategoryModal.find(
    {},
    "title description thumbnail"
  );
  return new Response(
    JSON.stringify({
      msg: "Categories Fetched Successfully",
      categories,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newCategory = new CategoryModal(obj);
  await newCategory.save();

  return new Response(
    JSON.stringify({
      msg: "Category Added Successfully",
      category: newCategory,
    }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
}

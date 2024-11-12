import { connectDB } from "@/lib/db/connectDB";
import { SubCategoryModal } from "@/lib/modals/subCatagory";

export async function GET(request) {
  await connectDB();
  const queryurl = request.url;

  const { searchParams } = new URL(queryurl);
  console.log("searchParams=>", searchParams);
  const query = {};
  if (searchParams.get("category")) {
    query.category = searchParams.get("category");
  }
  console.log("query=>", query);

  const categories = await SubCategoryModal.find(query).populate(
    "category",
    "title"
  );
  return Response.json(
    {
      msg: "SubCategories Fetched Successfully",
      categories,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newSubCategory = new SubCategoryModal(obj);
  await newSubCategory.save();

  return Response.json(
    {
      msg: "SubCategory Added Successfully ",
      subcategory: newSubCategory,
    },
    { status: 201 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}

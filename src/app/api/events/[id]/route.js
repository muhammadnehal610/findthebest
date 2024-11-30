import { connectDB } from "@/lib/db/connectDB";
import { eventModale } from "@/lib/modals/event";
import { SubCategoryModal } from "@/lib/modals/subCatagory";
import { CategoryModel } from "@/lib/modals/catagory";
import { UserModal } from "@/lib/modals/user";

export async function GET(request, { params }) {
  await connectDB();
  let event = await eventModale
    .findOne({ _id: params.id })
    .populate("category", "title")
    .populate("createdBy", "fullname email profileImg")
    .populate("subCategory", "title")
    .populate("going", "fullname email profileImg"); // Populate going field

  return Response.json(
    {
      msg: "single Event Fetched Successfully",
      event,
    },
    { status: 200 }
  );
}

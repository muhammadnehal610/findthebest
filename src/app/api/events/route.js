import { connectDB } from "@/lib/db/connectDB";
import { eventModale } from "@/lib/modals/event";
import { SubCategoryModal } from "@/lib/modals/subCatagory";
import { CategoryModel } from "@/lib/modals/catagory";
import { UserModal } from "@/lib/modals/user";
import { trusted } from "mongoose";

export async function GET(request) {
  await connectDB();

  const query = {};

  try {
    const events = await eventModale
      .find(query)
      .populate("category", "title")
      .populate("createdBy", "fullname email profileImg")
      .populate("subCategory", "title");
    return Response.json(
      {
        message: "event fetched successfully",
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return Response.json(
      {
        message: "Failed to fetch event",
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
    const user = await UserModal.findOne({ _id: obj.createdBy });

    if (!user)
      return Response.json(
        {
          error: true,
          message: "user not found",
          data: null,
        },
        { status: 403 }
      );

    let newEvent = new eventModale(obj);
    await newEvent.save();

    return Response.json(
      {
        message: "event added successfully",
        Events: newEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding event:", error);
    return Response.json(
      {
        message: "Failed to add event",
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

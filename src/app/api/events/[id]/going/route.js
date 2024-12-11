import { connectDB } from "@/lib/db/connectDB";
import { eventModale } from "@/lib/modals/event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request, { params }) {
  await connectDB();

  const eventId = params.id;
  const { userId } = await request.json();

  if (!eventId || !userId) {
    return NextResponse.json(
      {
        error: true,
        msg: "Event ID and User ID are required",
      },
      { status: 400 }
    );
  }

  try {
    const event = await eventModale.findById(eventId);

    if (!event) {
      return NextResponse.json(
        {
          error: true,
          msg: "Event Not Found",
        },
        { status: 404 }
      );
    }

    let updated;
    let message;

    if (!event.going.includes(userId)) {
      updated = await eventModale.findByIdAndUpdate(
        eventId,
        { $addToSet: { going: userId } },
        { new: true }
      );
      message = "Congrats, You are now part of the event";
    } else {
      updated = await eventModale.findByIdAndUpdate(
        eventId,
        { $pull: { going: userId } },
        { new: true }
      );
      message = "You are no longer going to the event";
    }

    return NextResponse.json(
      {
        msg: message,
        event: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      {
        error: true,
        msg: "An error occurred while updating the event",
      },
      { status: 500 }
    );
  }
}

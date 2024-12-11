import { connectDB } from "@/lib/db/connectDB";
import { CommentModel } from "@/lib/modals/comment";
import { UserModal } from "@/lib/modals/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const event = request.nextUrl.searchParams.get("event");
  const comments = await CommentModel.find({ event: event }).populate(
    "user",
    "fullname email profileImg"
  );
  return NextResponse.json(
    {
      msg: "Comments Fetched Successfully",
      comments,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newComment = new CommentModel(obj);
  await newComment.save();

  // Populate the user field after saving
  await newComment.populate("user", "fullname email profileImg");

  return NextResponse.json(
    {
      msg: "Comment Added Successfully",
      comment: newComment,
    },
    { status: 201 }
  );
}

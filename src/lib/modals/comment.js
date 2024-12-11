import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    comment: String,
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    event: { type: mongoose.Types.ObjectId, ref: "events" },
  },
  { timestamps: true }
);
export const CommentModel =
  mongoose.models.comments || mongoose.model("comments", CommentSchema);

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export const CategoryModel =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

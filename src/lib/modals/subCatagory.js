import mongoose from "mongoose";
const { Schema } = mongoose;

const subcategorySchema = new Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: { type: String, required: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "categories",
    required: true,
  },
});

export const SubCategoryModal =
  mongoose.models.subcategories ||
  mongoose.model("subcategories", subcategorySchema);

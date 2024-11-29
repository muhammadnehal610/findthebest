import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  discription: String,
  startTime: String,
  endTime: String,
  startDate: String,
  endDate: String,
  location: {
    lang: Number,
    lat: Number,
  },
  thumbnail: String,
  address: String,
  createdBy: { type: mongoose.Types.ObjectId, ref: "users" },
  category: { type: mongoose.Types.ObjectId, ref: "categories" },
  subCategory: { type: mongoose.Types.ObjectId, ref: "subcategories" },
  going: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});
export const eventModale =
  mongoose.models.event || mongoose.model("event", eventSchema);

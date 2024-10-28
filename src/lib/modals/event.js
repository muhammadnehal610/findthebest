import mongoose, { Schema } from "mongoose";
const { schema } = mongoose;

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
  thumbnil: String,
  address: String,
  createrBy: { type: mongoose.Types.ObjectId, ref: "users" },
  going: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});
export const eventModale = mongoose.Model("event", eventSchema);

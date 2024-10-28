import mongoose, { Schema } from "mongoose";
const { schema } = mongoose;

const subCatagorySchema = new Schema({
  title: String,
  discription: String,
  catagory: { type: mongoose.Types.ObjectId, ref: "catagory" },
  thumbnil: String,
});
export const subCatagoryModale = mongoose.Model(
  "subcatagory",
  subCatagorySchema
);

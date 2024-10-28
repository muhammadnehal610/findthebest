import mongoose, { Schema } from "mongoose";
const { schema } = mongoose;

const catagorySchema = new Schema({
  title: String,
  discription: String,

  thumbnil: String,
});
export const catagoryModale = mongoose.Model("catagory", catagorySchema);

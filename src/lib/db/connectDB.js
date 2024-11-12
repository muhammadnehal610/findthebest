import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  // if (connection.readyState >= 1) {
  //   return;
  // }

  try {
    await connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

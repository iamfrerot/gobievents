import mongoose from "mongoose";
import { config } from "dotenv";
config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
 throw new Error("Please define the MONGODB_URI environment variable");
}

async function connectDB() {
 try {
  await mongoose.connect(MONGODB_URI as string);
  console.log("MongoDB connected");
 } catch (error) {
  console.error("MongoDB connection error:", error);
  throw error;
 }
}

export default connectDB;

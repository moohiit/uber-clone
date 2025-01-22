import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv({});

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected Successfully.");
};

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectMongo;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async (MONGO_URI) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected:--------------------------------${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB error:---------------------------${error.message}`);
  }
};

export default connectToDB;

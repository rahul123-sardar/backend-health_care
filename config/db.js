import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; // reuse connection

    await mongoose.connect(process.env.MONGO_URI); // No extra options
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // reuse existing connection
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
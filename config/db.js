import mongoose from "mongoose";

const connectDB = async () => {
 // Replace your current mongoose.connect with this
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000 // Fast fail after 5s instead of hanging for 10s
})
.then(() => console.log("✅ Database Connected Successfully"))
.catch(err => {
  console.error("❌ Database Connection Error:");
  console.error(err.message); // This will tell you EXACTLY why it failed
}); 
};

export default connectDB;
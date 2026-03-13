import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "https://frontend-health-care-pink.vercel.app",
    "https://frontend-health-care-git-main-rahul123-sardars-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/patient", patientRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});
app.get("/", (req, res) => {
    res.send("API Running");
});

export default app;
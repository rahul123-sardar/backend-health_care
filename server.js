import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import patientRoutes from "./routes/patientRoutes.js";

const app = express();

// CORS Middleware (must be BEFORE routes)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-health-care-pink.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/patient", patientRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
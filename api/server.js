import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import patientRoutes from "../routes/patientRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect database
await connectDB();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/patient", patientRoutes);

export default app;
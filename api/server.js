import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import patientRoutes from "../routes/patientRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// Allow React frontend
app.use(cors({
  origin: "https://frontend-health-care-pink.vercel.app", // React dev server
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

app.use("/api/patient", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


export default app;

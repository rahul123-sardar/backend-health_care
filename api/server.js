import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import patientRoutes from "../routes/patientRoutes.js";

dotenv.config();
await connectDB();

const app = express();

// CORS middleware: allow your frontend
app.use(cors({
  origin: "https://frontend-health-care-pink.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

app.use("/api/patient", patientRoutes);
// Default route for testing
app.get("/", (req, res) => res.send("Backend is working"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


export default app;

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(cors({
  origin: "https://frontend-health-care-pink.vercel.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/patient", patientRoutes);

connectDB();

export default app;
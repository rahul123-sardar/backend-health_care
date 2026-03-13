import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/patient", patientRoutes);

export default app;
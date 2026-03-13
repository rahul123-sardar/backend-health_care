import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

// middleware
app.use(cors({
  origin: "*",   // allow all for now
  methods: ["GET","POST","PUT","DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/patient", patientRoutes);

// connect database
connectDB();

export default app;
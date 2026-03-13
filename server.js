import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/patient", patientRoutes);

const PORT = 5000;

const startServer = async () => {
  await connectDB();   // ⭐ connect DB first

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
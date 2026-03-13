import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://frontend-health-care-pink.vercel.app"], // frontend URLs
  methods: ["GET","POST","PUT","DELETE"],
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


app.listen(5000, () => console.log("Server running on port 5000"));
export default app;
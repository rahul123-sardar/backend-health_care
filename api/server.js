import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import patientRoutes from "../routes/patientRoutes.js";

dotenv.config();
await connectDB();

const app = express();
const allowedOrigins = [
  'http://localhost:5173', 
  'https://frontend-health-care-pink.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();

app.use(cors({
  origin: "https://frontend-health-care-pink.vercel.app/", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/patient", patientRoutes);

connectDB();

mongoose.connection.once("open", () => {
  console.log("DB is ready");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
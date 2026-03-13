import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";
const router = express.Router();




// CORS headers for serverless
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-health-care-pink.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

// POST route
router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const patient = await Patient.create({
      patientId: req.body.patientId,
      name: req.body.name,
      vitals: req.body.vitals,
      billingCode: req.body.billingCode,
      diagnosis: req.body.diagnosis,
      notes: req.body.notes,
      image: req.file.path, // Cloudinary URL
    });
    res.status(201).json({ message: "Patient saved successfully", data: patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});





router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error); // logs exact error
    res.status(500).json({ message: error.message });
  }
});
export default router;
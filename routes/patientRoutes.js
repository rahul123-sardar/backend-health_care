import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js"; // correct path

const router = express.Router();

// GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/patient/save
router.post("/save", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    res.json({ message: "Check console" });
    const { patientId, name, vitals, billingCode, diagnosis, notes } = req.body;

    if (!patientId || !name) {
      return res.status(400).json({ message: "Patient ID and Name are required" });
    }

    // req.file.path will contain the Cloudinary URL
    const patient = new Patient({
      patientId,
      name,
      vitals,
      billingCode,
      diagnosis,
      notes,
      image: req.file ? req.file.path : null,
    });

    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    console.error("Error saving patient:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
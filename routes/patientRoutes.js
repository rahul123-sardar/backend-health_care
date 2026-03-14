import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const { patientId, name, vitals, billingCode, diagnosis, notes } = req.body;

    const patient = new Patient({
      patientId,
      name,
      vitals,
      billingCode,
      diagnosis,
      notes,
      image: req.file ? req.file.path : null
    });

    const saved = await patient.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
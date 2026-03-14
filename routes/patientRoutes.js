import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const { patientId, name, vitals, billingCode, diagnosis, notes } = req.body;

    if (!patientId || !name) {
      return res.status(400).json({ message: "Patient ID and Name required" });
    }

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
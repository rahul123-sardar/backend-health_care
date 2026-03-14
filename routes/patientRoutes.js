import express from "express";
import Patient from "../models/Patient.js";

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

// POST add a patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    console.error("Error saving patient:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
import express from "express";
import mongoose from "mongoose";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";


const router = express.Router();



async function handler(req, res) {
  try {
    const patients = await db.getPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




router.post("/save", upload.single("image"), async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { patientId, name, vitals, billingCode, diagnosis, notes } = req.body;

    const patient = await Patient.create({
      patientId: Number(patientId),
      name,
      vitals,
      billingCode: Number(billingCode),
      diagnosis,
      notes,
      image: req.file?.path || null
    });

    res.json(patient);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});




router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: error.message });
  }
});
export default router;
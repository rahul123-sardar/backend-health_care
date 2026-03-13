import express from "express";
import mongoose from "mongoose";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";


const router = express.Router();







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



// router.post("/save", upload.single("image"), async (req, res) => {
//   try {
//     console.log("Body:", req.body);
//     console.log("File:", req.file);

//     const patientData = {
//       patientId: req.body.patientId,
//       name: req.body.name,
//       vitals: req.body.vitals,
//       billingCode: req.body.billingCode,
//       diagnosis: req.body.diagnosis,
//       notes: req.body.notes,
//       image: req.file ? req.file.path : null // <-- Safe fallback
//     };

//     const patient = await Patient.create(patientData);

//     res.status(201).json({
//       message: "Patient saved successfully",
//       data: patient
//     });
//   } catch (err) {
//     console.error("ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });


router.get("/", async (req, res) => {
  const patients = await Patient.find({});
  res.json(patients);
});
export default router;
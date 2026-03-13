import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";
const router = express.Router();




router.post("/save", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const imageUrl = req.file ? req.file.path : "";

    const patient = await Patient.create({
      patientId: req.body.patientId,
      name: req.body.name,
      vitals: req.body.vitals,
      billingCode: req.body.billingCode,
      diagnosis: req.body.diagnosis,
      notes: req.body.notes,
      image: imageUrl
    });

    res.status(201).json({
      message: "Patient saved successfully",
      data: patient
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: error.message,
      error: error
    });
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
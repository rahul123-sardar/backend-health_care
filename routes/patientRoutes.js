import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";

const router = express.Router();


router.options("/save", (req, res) => {
  // Preflight response
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-health-care-pink.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.status(200).end();
});


router.post("/save", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-health-care-pink.vercel.app');
  try {
    // Your patient saving logic
    const patient = new Patient(req.body);
    await patient.save();
    res.status(200).json({ message: "Patient saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
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
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error); // logs exact error
    res.status(500).json({ message: error.message });
  }
});
export default router;
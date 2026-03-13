import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";

const router = express.Router();


router.post("/save", upload.single("image"), async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-health-care-pink.vercel.app');

  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { patientId, name, vitals, billingCode, diagnosis, notes } = req.body;
    const image = req.file ? req.file.path : null;

  
     const patient = new Patient(req.body);


    await patient.save();
    res.status(200).json({ message: "Patient saved successfully", patient });
  } catch (err) {
    console.error("Full error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
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
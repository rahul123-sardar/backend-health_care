import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";

import Save from "./api/patient/save.js"
import handler from "../api/patient/save.js";
const router = express.Router();




// router.post("/save", upload.single("image"), async (req, res) => {
//   try {
//     console.log("Body:", req.body);
//     console.log("File:", req.file);

//     const patient = await Patient.create({
//       patientId: req.body.patientId,
//       name: req.body.name,
//       vitals: req.body.vitals,
//       billingCode: req.body.billingCode,
//       diagnosis: req.body.diagnosis,
//       notes: req.body.notes,
//       image: req.file.path // This is the Cloudinary URL
//     });

//     res.status(201).json({
//       message: "Patient saved successfully",
//       data: patient
//     });
//   } catch (err) {
//     console.log("ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });


router.post("/save", upload.single("image"), handler);

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
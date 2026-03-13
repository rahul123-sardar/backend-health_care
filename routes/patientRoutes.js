import express from "express";
import mongoose from "mongoose";
import Patient from "../models/Patient.js";
import upload, { uploadToCloudinary } from "../config/multer.js";



const router = express.Router();



 




router.post("/save", upload.single("image"), async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);          // Check incoming data
    console.log("REQ.FILE:", req.file);          // Check file info

    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, Date.now().toString());
      imageUrl = result.secure_url;
      console.log("Cloudinary result:", result);
    }

    const patientData = { ...req.body, image: imageUrl };
    const patient = await Patient.create(patientData);
    res.json(patient);
  } catch (err) {
    console.error("POST /save ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
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
import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/save", upload.single("image"), async (req, res) => {
  try {

    const { patientId, name, vitals, billingCode, diagnosis, notes } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const patient = new Patient({
      patientId,
      name,
      vitals,
      billingCode,
      diagnosis,
      notes,
      image: imageUrl
    });

    const saved = await patient.save();

    res.status(201).json(saved);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
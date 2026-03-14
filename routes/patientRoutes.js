import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js";
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

router.post('/save', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    if (req.file) {
      // Upload the file buffer directly to Cloudinary
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'patients' },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const patientData = { ...req.body, image: imageUrl };
    const patient = await Patient.create(patientData);
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
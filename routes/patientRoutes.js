import express from "express";
import Patient from "../models/Patient.js";
import upload from "../config/multer.js"; // correct path

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

// POST /api/patient/save
const upload = multer({ storage: multer.memoryStorage() });

router.post("/save", upload.single("image"), async (req, res) => {
  try {

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "patients" },
        async (error, result) => {
          if (error) throw error;
        }
      );
    }

    const patient = new Patient({
      patientId: req.body.patientId,
      name: req.body.name,
      vitals: req.body.vitals,
      billingCode: req.body.billingCode,
      diagnosis: req.body.diagnosis,
      notes: req.body.notes,
      image: imageUrl,
    });

    await patient.save();

    res.json({ message: "Patient saved successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
export default router;
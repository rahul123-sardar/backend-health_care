// /api/patient/save.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import connectDB from "../../utils/db.js"; // your MongoDB connection
import Patient from "../../models/Patient.js";

export const config = { api: { bodyParser: false } };

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "patients", allowed_formats: ["jpg", "jpeg", "png"] }
});

const upload = multer({ storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-health-care-pink.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      await connectDB();
      await runMiddleware(req, res, upload.single("image"));

      const patient = await Patient.create({
        patientId: req.body.patientId,
        name: req.body.name,
        vitals: req.body.vitals,
        billingCode: req.body.billingCode,
        diagnosis: req.body.diagnosis,
        notes: req.body.notes,
        image: req.file.path // Cloudinary URL
      });

      return res.status(201).json({ message: "Patient saved", data: patient });
    } catch (err) {
      console.error("Server Error:", err);
      return res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
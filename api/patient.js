// api/patient.js
import mongoose from "mongoose";

// Connect to MongoDB (reuse connection if already connected)
let conn = null;
const connectDB = async () => {
  if (conn) return;
  conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Example Patient model
const PatientSchema = new mongoose.Schema({
  patientId: Number,
  name: String,
  vitals: String,
  billingCode: Number,
  diagnosis: String,
  notes: String,
  image: String,
});

const Patient = mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-health-care-pink.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectDB();

  if (req.method === "GET") {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  }

  if (req.method === "POST") {
    const newPatient = new Patient(req.body);
    const saved = await newPatient.save();
    return res.status(201).json(saved);
  }

  res.status(405).json({ message: "Method not allowed" });
}
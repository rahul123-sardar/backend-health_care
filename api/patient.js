import connectDB from "../config/db.js";
import Patient from "../models/Patient.js";

export default async function handler(req, res) {
  await connectDB(); // ensure DB connection

  if (req.method === "GET") {
    try {
      const patients = await Patient.find({});
      res.status(200).json(patients);
    } catch (err) {
      console.error("Error fetching patients:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const patient = new Patient(req.body);
      const savedPatient = await patient.save();
      res.status(201).json(savedPatient);
    } catch (err) {
      console.error("Error saving patient:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
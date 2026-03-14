import Patient from "../../models/Patient";
import connectDB from "../../config/db";

export default async function handler(req, res) {
  await connectDB(); // ensure DB is connected

  if (req.method === "GET") {
    try {
      const patients = await Patient.find({});
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
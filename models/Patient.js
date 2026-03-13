// Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  vitals: String,
  billingCode: Number,
  diagnosis: String,
  notes: String,
  image: String,
});

export default   mongoose.model("Patient", patientSchema);
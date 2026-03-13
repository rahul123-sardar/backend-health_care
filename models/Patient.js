// Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: Number,
  name: String,
  vitals: String,
  billingCode: Number,
  diagnosis: String,
  notes: String,
  image: String,
});

export default   mongoose.model("Patient", patientSchema);
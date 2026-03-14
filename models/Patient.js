import mongoose from "mongoose";

// Define the schema
const patientSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    unique: true,          // keeps patientId unique
    required: true,        // ensure no nulls
  },
  name: { type: String, required: true },
  vitals: String,
  billingCode: Number,
  diagnosis: String,
  notes: String,
  image: String,
});

// Use existing model if it exists (prevents overwrite in serverless hot reloads)
export default mongoose.models.Patient || mongoose.model("Patient", patientSchema);
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  vitals: String,
  billingCode: Number,
  diagnosis: String,
  notes: String,
  image: String
});

export default mongoose.models.Patient ||
mongoose.model("Patient", patientSchema);
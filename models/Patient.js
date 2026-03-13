const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  vitals: { type: String },
  billingCode: { type: Number },
  diagnosis: { type: String },
  notes: { type: String },
  image: { type: String }, // URL from Cloudinary
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
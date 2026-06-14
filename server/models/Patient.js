import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: String,
  problem: String,
  contact: String
});

export default mongoose.model("Patient", patientSchema);
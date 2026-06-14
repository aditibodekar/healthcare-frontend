import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Patient from "./models/Patient.js";
import Volunteer from "./models/Volunteer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* -------------------- POST APIs -------------------- */
app.post("/api/patient", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const data = await Patient.create(req.body);

    console.log("Saved:", data);

    res.status(201).json(data);
  } catch (error) {
    console.log("Backend Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/volunteer", async (req, res) => {
  try {
    console.log("Volunteer Received:", req.body);

    const data = await Volunteer.create(req.body);

    console.log("Volunteer Saved:", data);

    res.status(201).json(data);
  } catch (error) {
    console.log("Volunteer Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- GET APIs (ADMIN DASHBOARD) -------------------- */
app.get("/api/patients", async (req, res) => {
  const data = await Patient.find().sort({ _id: -1 });
  res.json(data);
});

app.get("/api/volunteers", async (req, res) => {
  const data = await Volunteer.find().sort({ _id: -1 });
  res.json(data);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
app.delete("/api/patient/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/volunteer/:id", async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});
app.get("/api/patients", (req, res) => {
  res.json([{ name: "Test Patient" }]);
});
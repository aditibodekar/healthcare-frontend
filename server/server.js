import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Patient from "./models/Patient.js";
import Volunteer from "./models/Volunteer.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- MONGODB CONNECTION -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* -------------------- HOME ROUTE -------------------- */
app.get("/", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

/* -------------------- PATIENT API -------------------- */
app.post("/api/patient", async (req, res) => {
  try {
    const data = await Patient.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/patients", async (req, res) => {
  try {
    const data = await Patient.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/patient/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- VOLUNTEER API -------------------- */
app.post("/api/volunteer", async (req, res) => {
  try {
    const data = await Volunteer.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/volunteers", async (req, res) => {
  try {
    const data = await Volunteer.find().sort({ _id: -1 });
    res.json(data);
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

/* -------------------- ADMIN LOGIN API (FIXED) -------------------- */
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // demo login (you can later connect MongoDB users)
  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
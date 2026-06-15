import { useState } from "react";

export default function PatientForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    problem: "",
    symptoms: "",
    medicalHistory: "",
    address: "",
    contact: "",
    emergencyContact: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async () => {
    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.problem ||
      !form.contact
    ) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("https://healthcare-backend-svax.onrender.com/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      console.log(data);

      alert("Patient registered successfully!");

      setForm({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        problem: "",
        symptoms: "",
        medicalHistory: "",
        address: "",
        contact: "",
        emergencyContact: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error submitting patient form");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Patient Registration 🩺</h1>

        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
        <input name="problem" placeholder="Health Problem" value={form.problem} onChange={handleChange} />
        <input name="symptoms" placeholder="Symptoms" value={form.symptoms} onChange={handleChange} />
        <textarea name="medicalHistory" placeholder="Medical History" value={form.medicalHistory} onChange={handleChange}></textarea>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <input name="emergencyContact" placeholder="Emergency Contact" value={form.emergencyContact} onChange={handleChange} />

        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
}

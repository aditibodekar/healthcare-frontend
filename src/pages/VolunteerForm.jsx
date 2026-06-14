import { useState } from "react";

export default function VolunteerForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    skills: "",
    specialization: "",
    experience: "",
    availability: "",
    location: "",
    contact: "",
    email: ""
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
      !form.skills ||
      !form.availability ||
      !form.contact
    ) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      console.log(data);

      alert("Volunteer registered successfully!");

      setForm({
        name: "",
        age: "",
        gender: "",
        skills: "",
        specialization: "",
        experience: "",
        availability: "",
        location: "",
        contact: "",
        email: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error submitting volunteer form");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Volunteer Registration 🤝</h1>

        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} />
        <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
        <input name="experience" placeholder="Experience (years)" value={form.experience} onChange={handleChange} />
        <input name="availability" placeholder="Availability" value={form.availability} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />

        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
}
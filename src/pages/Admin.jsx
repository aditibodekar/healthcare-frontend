import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function Admin() {
  const [patients, setPatients] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, vRes] = await Promise.all([
        fetch("https://healthcare-backend-svax.onrender.com/api/patients"),
        fetch("https://healthcare-backend-svax.onrender.com/api/volunteers")
      ]);

      const pData = await pRes.json();
      const vData = await vRes.json();

      setPatients(pData);
      setVolunteers(vData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete patient
  const deletePatient = async (id) => {
    try {
      await fetch(`https://healthcare-backend-svax.onrender.com/api/patient/${id}`, {
        method: "DELETE"
      });

      setPatients(patients.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Error deleting patient:", error);
    }
  };

  // Delete volunteer
  const deleteVolunteer = async (id) => {
    try {
      await fetch(`https://healthcare-backend-svax.onrender.com/api/volunteer/${id}`, {
        method: "DELETE"
      });

      setVolunteers(volunteers.filter((v) => v._id !== id));
    } catch (error) {
      console.log("Error deleting volunteer:", error);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading Dashboard...</h2>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard 📊</h1>
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <h2>{patients.length}</h2>
          <p>Total Patients</p>
        </div>

        <div className="stat-box">
          <h2>{volunteers.length}</h2>
          <p>Total Volunteers</p>
        </div>
      </div>

      {/* Patients */}
      <div className="admin-section">
        <h2>🩺 Patients</h2>

        <div className="cards-grid">
          {patients.length === 0 ? (
            <p>No patients found</p>
          ) : (
            patients.map((p) => (
              <div key={p._id} className="admin-card">
                <p><b>Name:</b> {p.name}</p>
                <p><b>Age:</b> {p.age}</p>
                <p><b>Problem:</b> {p.problem}</p>
                <p><b>Contact:</b> {p.contact}</p>

                <button onClick={() => deletePatient(p._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Volunteers */}
      <div className="admin-section">
        <h2>🤝 Volunteers</h2>

        <div className="cards-grid">
          {volunteers.length === 0 ? (
            <p>No volunteers found</p>
          ) : (
            volunteers.map((v) => (
              <div key={v._id} className="admin-card">
                <p><b>Name:</b> {v.name}</p>
                <p><b>Skills:</b> {v.skills}</p>
                <p><b>Availability:</b> {v.availability}</p>
                <p><b>Contact:</b> {v.contact}</p>

                <button onClick={() => deleteVolunteer(v._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

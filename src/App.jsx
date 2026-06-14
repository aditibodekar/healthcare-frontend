import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import PatientForm from "./pages/PatientForm.jsx";
import VolunteerForm from "./pages/VolunteerForm.jsx";
import Admin from "./pages/Admin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/patient" element={<PatientForm />} />
        <Route path="/volunteer" element={<VolunteerForm />} />

        {/* Login page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin page */}
        <Route
          path="/admin"
          element={
            localStorage.getItem("adminAuth") === "true"
              ? <Admin />
              : <AdminLogin />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
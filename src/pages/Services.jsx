import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot.jsx";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-page">

      <div
        className="service-card patient-card"
        onClick={() => navigate("/patient")}
      >
        🩺 Patient Support
      </div>

      <div
        className="service-card volunteer-card"
        onClick={() => navigate("/volunteer")}
      >
        🤝 Volunteer Registration
      </div>

      <Chatbot />
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot.jsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="tag">Healthcare Support Platform</span>

          <h1>Caring for Life,<br />One Click Away ❤️</h1>

          <p>Connect patients and volunteers instantly with support.</p>
          <div className="button-group">
          <button onClick={() => navigate("/services")}>
            Get Started
          </button>
          <button onClick={() => navigate("/admin")}>
        Go to Admin Dashboard
      </button>
    </div>
      
        </div>
      </div>

      <Chatbot />
    </div>
  );
}

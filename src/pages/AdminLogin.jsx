import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await fetch(
        "https://healthcare-backend-svax.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminAuth", "true");
        alert("Login successful ✅");
        navigate("/admin");
      } else {
        alert(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-box">
        <h1>Admin Login 🔐</h1>

        <input
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
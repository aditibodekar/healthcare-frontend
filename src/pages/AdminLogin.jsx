import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login clicked", credentials);

    if (
      credentials.username === "" &&
      credentials.password === ""
    ) {
      localStorage.setItem("adminAuth", "true");
      console.log("Login success");
      navigate("/admin");
    } else {
      console.log("Invalid");
      alert("Invalid credentials");
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
            setCredentials({
              ...credentials,
              username: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value
            })
          }
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
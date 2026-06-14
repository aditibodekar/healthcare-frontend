import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/patient">Patient</Link>
      <Link to="/volunteer">Volunteer</Link>

      {/* ADMIN BUTTON */}
      <Link to="/admin" className="admin-btn">
        Admin
      </Link>
    </nav>
  );
}
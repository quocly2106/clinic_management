// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ userName, userRole, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    onLogout();
    navigate("/login");
  };

  // Navbar.js
  return (
    <nav className="navbar navbar-expand-md navbar-white bg-white">
      <Link className="navbar-brand px-4" to="/">
        Nhan Tam
      </Link>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userName || "Guest"}
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              {userRole === "doctor" && (
                <button
                  className="dropdown-item"
                  to="/doctor/profile"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default just for testing
                    navigate("/doctor/profile");
                  }}
                >
                  Profile
                </button>
              )}
              {userRole === "receptionist" && (
                <button
                  className="dropdown-item"
                  to="/receptionist/profile"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default just for testing
                    navigate("/receptionist/profile");
                  }}
                >
                  Profile
                </button>
              )}
              {userRole === "admin" && (
                <button
                  className="dropdown-item"
                  to="/admin/profile"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default just for testing
                    navigate("/admin/profile");
                  }}
                >
                  Profile
                </button>
              )}

              <Link className="dropdown-item" to="/change-password">
                Change Password
              </Link>
              <Link className="dropdown-item" to="/setting">
                Setting
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

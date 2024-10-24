// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import "./Navbar.css";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>

function Navbar({ userName, userRole, onLogout }) {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    onLogout();
    setShowToast(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">Nhan Tam</span>
          </Link>
          
          <button
            className="navbar-toggler"
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle user-profile"
                  to="/"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle me-2"></i>
                  <span>{userName || "Guest"}</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end animate slideIn" aria-labelledby="dropdownId">
                  {userRole && (
                    <div className="dropdown-header">
                      <span className="user-role">{userRole.toUpperCase()}</span>
                    </div>
                  )}
                  
                  {userRole && (
                    <button
                      className="dropdown-item"
                      onClick={() => navigate(`/${userRole}/profile`)}
                    >
                      <i className="fas fa-id-card me-2"></i>Profile
                    </button>
                  )}

                  <Link className="dropdown-item" to="/change-password">
                    <i className="fas fa-key me-2"></i>Change Password
                  </Link>

                  <Link className="dropdown-item" to="/setting">
                    <i className="fas fa-cog me-2"></i>Settings
                  </Link>

                  <div className="dropdown-divider"></div>

                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ToastContainer className="p-3" position="top-end">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="info"
        >
          <Toast.Header closeButton={false}>
            <i className="fas fa-sign-out-alt me-2"></i>
            <strong className="me-auto">Logging Out</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            See you next time!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Navbar;
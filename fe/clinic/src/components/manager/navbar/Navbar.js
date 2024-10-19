// src/components/manager/navbar/Navbar.js
import React from 'react';

function Navbar({ userName }) { // Nhận userName từ props
  return (
    <nav className="navbar navbar-expand-md navbar-white bg-white">
      <a className="navbar-brand px-4" href="/">Nhan Tam</a>
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
            <a
              className="nav-link dropdown-toggle"
              href="/home"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userName || "Guest"} {/* Hiển thị email hoặc "Guest" */}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="/profile">Profile</a>
              <a className="dropdown-item" href="/setting">Setting</a>
              <a className="dropdown-item" href="/logout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

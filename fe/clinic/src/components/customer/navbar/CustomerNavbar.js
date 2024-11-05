import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerNavbar.css"

function CustomerNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <Link className="navbar-brand" to="/">
        <div className="brand-container">
          <div className="logo-container">
            <div className="logo-circle">
              <div className="circle-border"></div>
              <div className="cross cross-vertical"></div>
              <div className="cross cross-horizontal"></div>
            </div>
          </div>
          <div className="text">Nhân Tâm</div>
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              Về chúng tôi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">
              Dịch vụ 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/doctors">
              Bác sĩ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/appointment">
              Đặt lịch 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Liên Hệ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default CustomerNavbar;

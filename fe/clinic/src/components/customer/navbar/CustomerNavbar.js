// src/components/customer/navbar/CustomerNavbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CustomerNavbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Medical Clinic</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
                to="/services"
              >
                Dịch vụ
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/doctors' ? 'active' : ''}`}
                to="/doctors"
              >
                Bác sĩ
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/appointment' ? 'active' : ''}`}
                to="/appointment"
              >
                Đặt lịch
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/news' ? 'active' : ''}`}
                to="/news"
              >
                Tin tức
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                to="/contact"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
          
          {/* Login button for admin access */}
          <Link to="/login" className="btn btn-outline-primary">
            <i className="bi bi-person-circle me-2"></i>
            Đăng nhập quản trị
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
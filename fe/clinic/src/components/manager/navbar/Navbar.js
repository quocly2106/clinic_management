import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ userName, onLogout }) {
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Gọi hàm onLogout để cập nhật trạng thái người dùng
    onLogout(); 

    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  };

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
              {userName || "Guest"}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <Link className="dropdown-item" to="/setting">Setting</Link>
              <button className="dropdown-item" onClick={handleLogout}>Logout</button> {/* Nút đăng xuất */}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

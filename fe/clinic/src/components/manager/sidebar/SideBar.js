import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SideBar.css';

const SideBar = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    onLogout();
    toast.success('Successfully logged out!');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="list-group list-group-flush">
        <Link className="list-group-item py-2" to="/">
          <i className="bi bi-speedometer2 fs-5 me-2"></i>
          <span className="small-font">Dashboard</span>
        </Link>
        <Link className="list-group-item py-2" to="/admin">
          <i className="bi bi-person-fill fs-5 me-2"></i>
          <span className="small-font">Admin</span>
        </Link>
        <Link className="list-group-item py-2" to="/doctor">
          <i className="bi bi-person-fill-add fs-5 me-2"></i>
          <span className="small-font">Doctor</span>
        </Link>
        <Link className="list-group-item py-2" to="/receptionist">
          <i className="bi bi-person-fill fs-5 me-2"></i>
          <span className="small-font">Receptionist</span>
        </Link>
        <Link className="list-group-item py-2" to="/patient">
          <i className="bi bi-people-fill fs-5 me-2"></i>
          <span className="small-font">Patient</span>
        </Link>
        <Link className="list-group-item py-2" to="/appointment">
          <i className="bi bi-calendar2-plus-fill fs-5 me-2"></i>
          <span className="small-font">Appointment</span>
        </Link>
        <Link className="list-group-item py-2" to="/specialty">
          <i className="bi bi-star-fill fs-5 me-2"></i>
          <span className="small-font">Specialty</span>
        </Link>
        {/* <Link className="list-group-item py-2" to="/schedule">
          <i className="bi bi-calendar3 fs-5 me-2"></i>
          <span className="fs-5">Schedule</span>
        </Link> */}
        <Link className="list-group-item py-2" to="/medicine">
          <i className="bi bi-capsule fs-5 me-2"></i>
          <span className="small-font">Medicine</span>
        </Link>
        <Link className="list-group-item py-2" to="/equipment">
          <i className="bi bi-tools fs-5 me-2"></i>
          <span className="small-font">Equipment</span>
        </Link>
        <Link className="list-group-item py-2" to="/news">
          <i className="bi bi-file-earmark-text-fill fs-5 me-2"></i>
          <span className="small-font">News</span>
        </Link>
        <Link className="list-group-item py-2" onClick={handleLogout}>
          <i className="bi bi-power fs-5 me-2"></i>
          <span className="small-font">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

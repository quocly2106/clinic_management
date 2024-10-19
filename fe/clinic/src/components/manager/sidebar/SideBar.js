import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="bg-white sidebar p-2">
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <Link className='list-group-item py-2' to='/'>
          <i className='bi bi-speedometer2 fs-4 me-3'></i>
          <span>Dashboard</span>
        </Link>
        <Link className='list-group-item py-2' to='/admin'>
          <i className='bi bi-person-fill fs-4 me-3'></i>
          <span className='fs-5'>Admin</span>
        </Link>
        <Link className='list-group-item py-2' to='/doctor'>
          <i className='bi bi-person-fill-add fs-4 me-3'></i>
          <span className='fs-5'>Doctor</span>
        </Link>
        <Link className='list-group-item py-2' to='/receptionist'>
          <i className='bi bi-person-fill fs-4 me-3'></i>
          <span className='fs-5'>Receptionist</span>
        </Link>
        <Link className='list-group-item py-2' to='/patient'>
          <i className='bi bi-people-fill fs-5 me-3'></i>
          <span className='fs-5'>Patient</span>
        </Link>
        <Link className='list-group-item py-2' to='/appointment'>
          <i className='bi bi-calendar2-plus-fill fs-5 me-3'></i>
          <span className='fs-5'>Appointment</span>
        </Link>
        <Link className='list-group-item py-2' to='/specialty'>
          <i className='bi bi-star-fill fs-4 me-3'></i>
          <span className='fs-5'>Specialty</span>
        </Link>
        <Link className='list-group-item py-2' to='/schedule'>
          <i className='bi bi-calendar3 fs-5 me-3'></i>
          <span className='fs-5'>Schedule</span>
        </Link>
        <Link className='list-group-item py-2' to='/medicine'>
          <i className='bi bi-capsule fs-5 me-3'></i>
          <span className='fs-5'>Medicine</span>
        </Link>
        <Link className='list-group-item py-2' to='/equipment'>
          <i className='bi bi-tools fs-5 me-3'></i>
          <span className='fs-5'>Equipment</span>
        </Link>
        <Link className='list-group-item py-2' to='/news'>
          <i className='bi bi-file-earmark-text-fill fs-4 me-3'></i>
          <span className='fs-5'>News</span>
        </Link>
        <Link className='list-group-item py-2' to='/logout'>
          <i className='bi bi-power fs-4 me-3'></i>
          <span className='fs-5'>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

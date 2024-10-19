import React from 'react';
import './SideBar.css'

const SideBar = () => {
  return (
    <div className="bg-white sidebar p-2">
        <hr className='text-dark'/>
        <div className='list-group list-group-flush '>
            <a className='list-group-item py-2' href='/dashboard'>
                <i className='bi bi-speedometer2 fs-4 me-3'></i>
                <span>Dashboard</span>
            </a>
            <a className='list-group-item py-2' href='/admin'>
                <i className='bi bi-person-fill fs-4 me-3'></i>
                <span className='fs-5'>Admin</span>
            </a>
            <a className='list-group-item py-2' href='/doctor'>
                <i className='bi bi-person-fill-add fs-4 me-3'></i>
                <span className='fs-5'>Doctor</span>
            </a>
            <a className='list-group-item py-2' href='/receptionist'>
                <i className='bi bi-person-fill fs-4 me-3'></i>
                <span className='fs-5'>Receptionist</span>
            </a>
            <a className='list-group-item py-2' href='/patient'>
                <i className='bi bi-people-fill fs-5 me-3'></i>
                <span className='fs-5'>Patient</span>
            </a>
            <a className='list-group-item py-2' href='/appointment'>
                <i className='bi bi-calendar2-plus-fill fs-5 me-3'></i>
                <span className='fs-5'>Appointment</span>
            </a>
            <a className='list-group-item py-2' href='/specialty'>
                <i className='bi bi-star-fill fs-4 me-3'></i>
                <span className='fs-5'>Specialty</span>
            </a>
            <a className='list-group-item py-2' href='/schudule'>
                <i className='bi bi-calendar3 fs-5 me-3'></i>
                <span className='fs-5'>Schedule</span>
            </a>
            <a className='list-group-item py-2' href='/medicine'>
                <i className='bi bi-capsule fs-5 me-3'></i>
                <span className='fs-5'>Medicine</span>
            </a>
            <a className='list-group-item py-2' href='/equipment'>
                <i className='bi bi-tools fs-5 me-3'></i>
                <span className='fs-5'>Equipment</span>
            </a>
            <a className='list-group-item py-2' href='/news'>
                <i className='bi bi-file-earmark-text-fill fs-4 me-3'></i>
                <span className='fs-5'>News</span>
            </a>
            <a className='list-group-item py-2' href='/logout'>
                <i className='bi bi-power fs-4 me-3'></i>
                <span className='fs-5'>Logout</span>
            </a>
        </div>
    </div>
  );
};

export default SideBar;

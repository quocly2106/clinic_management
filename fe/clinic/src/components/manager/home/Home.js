// src/components/manager/home/Home.js
import React from 'react';
import Navbar from '../navbar/Navbar';
import SideBar from '../sidebar/SideBar';
import Dashboard from '../dashboard/Dashboard';
import Doctor from '../doctor/Doctor';
import { Routes, Route } from 'react-router-dom';

function Home({ userName }) { // Nhận prop userName
  return (
    <>
      <Navbar userName={userName} /> {/* Truyền tên người dùng vào Navbar */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-light">
            <SideBar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doctor" element={<Doctor />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

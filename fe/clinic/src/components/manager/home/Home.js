import React from 'react';
import SideBar from '../sidebar/SideBar';
import Dashboard from '../dashboard/Dashboard';
import Doctor from '../doctor/Doctor';
import { Routes, Route } from 'react-router-dom';

function Home({ userName }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg-light">
          <SideBar />
        </div>
        <div className="col-10">
          {/* Chỉ cần giữ Routes ở đây, không cần Router khác */}
          <Routes>
            <Route path="*" element={<Dashboard />} /> {/* Cần định nghĩa rõ path cho Dashboard */}
            <Route path="/doctor" element={<Doctor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;

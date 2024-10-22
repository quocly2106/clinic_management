import React from "react";
import SideBar from "../sidebar/SideBar";
import Dashboard from "../dashboard/Dashboard";
import Doctor from "../doctor/Doctor";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorProfile from "../user/profile/DoctorProfile";
import ReceptionistProfile from "../user/profile/ReceptionistProfile";
import AdminProfile from "../user/profile/AdminProfile";
import ChangePassword from "../user/change-password/ChangePassword";
import AddDoctor from "../doctor/AddDoctor";
import EditDoctor from "../doctor/EditDoctor";

function Home({ userRole }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg-light">
          <SideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/edit-doctor/:doctorId" element={<EditDoctor />} />
            <Route
              path="/doctor/profile"
              element={
                userRole === "doctor" ? <DoctorProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="/receptionist/profile"
              element={
                userRole === "receptionist" ?  <ReceptionistProfile />  : <Navigate to="/" />
                
              }
            />
            <Route
              path="/admin/profile"
              element={
                userRole === "admin" ?  <AdminProfile />  : <Navigate to="/" />
                
              }
            />
             <Route
              path="/change-password"
              element={<ChangePassword />} // Thêm route cho ChangePassword
            />
      
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;

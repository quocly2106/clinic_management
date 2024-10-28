import React, { useState } from "react";
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
import { ToastContainer } from "react-bootstrap";
import Receptionist from "../receptionist/Receptionist";
import AddReceptionist from "../receptionist/AddReceptionist";
import EditReceptionist from "../receptionist/EditReceptionist";
import Admin from "../admin/Admin";
import Specialty from "../specialty/Specialty";
import AddSpecialty from "../specialty/AddSpecialty";
import EditSpecialty from "../specialty/EditSpecialty";
import Equipment from "../equipment/Equipment";
import AddEquipment from "../equipment/AddEquipment";
import EditEquipment from "../equipment/EditEquipment";
import Medicine from "../medicine/Medicine";
import EditMedicine from "../medicine/EditMedicine";
import AddMedicine from "../medicine/AddMedicine";
import Patient from "../patient/Patient";
import AddPatient from "../patient/AddPatient";
import EditPatient from "../patient/EditPatient";
import News from "../news/News";
import AddNews from "../news/AddNews";
import EditNews from "../news/EditNews";
import "./Home.css";

function Home({ userRole, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="container-fluid px-0">
      <ToastContainer />
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <div className="row">
        <div className={`col-2 bg-light ${sidebarOpen ? "" : "d-none"}`}>
          <SideBar onLogout={onLogout} />
        </div>
        <div className={`content-wrapper col-${sidebarOpen ? '10' : '12'}`}>
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/edit-doctor/:doctorId" element={<EditDoctor />} />
            <Route path="/receptionist" element={<Receptionist />} />
            <Route path="/add-receptionist" element={<AddReceptionist />} />
            <Route
              path="/edit-receptionist/:receptionistId"
              element={<EditReceptionist />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/specialty" element={<Specialty />} />
            <Route path="/add-specialty" element={<AddSpecialty />} />
            <Route
              path="/edit-specialty/:specialtyId"
              element={<EditSpecialty />}
            />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/add-equipment" element={<AddEquipment />} />
            <Route
              path="/edit-equipment/:equipmentId"
              element={<EditEquipment />}
            />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route
              path="/edit-medicine/:medicineId"
              element={<EditMedicine />}
            />
            <Route path="/patient" element={<Patient />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/edit-patient/:patientId" element={<EditPatient />} />
            <Route path="/news" element={<News />} />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/edit-news/:newsId" element={<EditNews />} />
            <Route
              path="/doctor/profile"
              element={
                userRole === "doctor" ? <DoctorProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="/receptionist/profile"
              element={
                userRole === "receptionist" ? (
                  <ReceptionistProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin/profile"
              element={
                userRole === "admin" ? <AdminProfile /> : <Navigate to="/" />
              }
            />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;

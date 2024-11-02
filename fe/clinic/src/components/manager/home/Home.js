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
import Appointment from "../appointment/Appointment";
import AddAppointment from "../appointment/AddAppointment";
import Service from "../service/Service";
import AddService from "../service/AddService";
import EditService from "../service/EditService";
import EditAppointment from "../appointment/EditAppointment";

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
        <div className={`content-wrapper col-${sidebarOpen ? "10" : "12"}`}>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/doctor" element={<Doctor />} />
            <Route path="/admin/add-doctor" element={<AddDoctor />} />
            <Route
              path="/admin/edit-doctor/:doctorId"
              element={<EditDoctor />}
            />
            <Route path="/admin/receptionist" element={<Receptionist />} />
            <Route
              path="/admin/add-receptionist"
              element={<AddReceptionist />}
            />
            <Route
              path="/admin/edit-receptionist/:receptionistId"
              element={<EditReceptionist />}
            />
            <Route path="/admin/admin" element={<Admin />} />
            <Route path="/admin/specialty" element={<Specialty />} />
            <Route path="/admin/add-specialty" element={<AddSpecialty />} />
            <Route
              path="/admin/edit-specialty/:specialtyId"
              element={<EditSpecialty />}
            />
            <Route path="/admin/service" element={<Service />} />
            <Route path="/admin/add-service" element={<AddService />} />
            <Route
              path="/admin/edit-service/:serviceId"
              element={<EditService />}
            />
            <Route path="/admin/medicine" element={<Medicine />} />
            <Route path="/admin/add-medicine" element={<AddMedicine />} />
            <Route
              path="/admin/edit-medicine/:medicineId"
              element={<EditMedicine />}
            />
            <Route path="/admin/patient" element={<Patient />} />
            <Route path="/admin/add-patient" element={<AddPatient />} />
            <Route
              path="/admin/edit-patient/:patientId"
              element={<EditPatient />}
            />
            <Route path="/admin/news" element={<News />} />
            <Route path="/admin/add-news" element={<AddNews />} />
            <Route path="/admin/edit-news/:newsId" element={<EditNews />} />
            <Route path="/admin/appointment" element={<Appointment />} />
            <Route path="/admin/add-appointment" element={<AddAppointment />} />
            <Route
              path="/admin/edit-appointment/:appointmentId"
              element={<EditAppointment />}
            />
            <Route
              path="/admin/doctor/profile"
              element={
                userRole === "doctor" ? <DoctorProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="/admin/receptionist/profile"
              element={
                userRole === "receptionist" ? (
                  <ReceptionistProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin/admin/profile"
              element={
                userRole === "admin" ? <AdminProfile /> : <Navigate to="/" />
              }
            />
            <Route path="/admin/change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;

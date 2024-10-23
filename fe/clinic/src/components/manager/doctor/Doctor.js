import React, { useEffect, useState } from "react";
import { allDoctors, deleteDoctor } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import './Doctor.css';
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from '../../../config/color';

function Doctor() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const fetchDoctors = async () => {
    try {
      const doctorsData = await allDoctors();
      setDoctors(doctorsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
      showToastMessage("Error fetching doctors data", "error");
    }
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (doctorId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Doctor No ${doctorId}?`);
    if (!confirmDelete) return;

    try {
      const result = await deleteDoctor(doctorId);
      if (result === null || result === "" || result === undefined || result.success) {
        showToastMessage(`Doctor No ${doctorId} was deleted successfully.`, "success");
      } else {
        showToastMessage(`Error deleting doctor: ${result.message || "Unknown error"}`, "error");
      }
      fetchDoctors();
    } catch (error) {
      showToastMessage(`Error: ${error.message}`, "error");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    return fullName.includes(search);
  });

  return (
    <div className="doctor-wrapper">
      <div className="doctor-container">
        <ToastContainer position="top-end" className="custom-toast">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            bg={toastType === "success" ? "success" : "danger"}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton>
              <strong className="me-auto">
                {toastType === "success" ? "Success" : "Error"}
              </strong>
            </Toast.Header>
            <Toast.Body className={toastType === "success" ? "text-white" : ""}>
              {toastMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <div className="search-section">
          <div className="search-add-wrapper">
            <div className="search-container">
              <BiSearchAlt className="search-icon" />
              <input
                type="search"
                className="search-input"
                placeholder="Search by name..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            <button
              className="add-button" style={{
                background: colors.background}}
              onClick={() => navigate("/add-doctor")}
            >
              <MdAdd className="add-icon" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Specialty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No doctors found
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor, index) => (
                    <tr key={doctor.id}>
                      <td>{index + 1}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.firstName}</td>
                      <td>{doctor.lastName}</td>
                      <td>{doctor.specialty ? doctor.specialty.name : "N/A"}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/edit-doctor/${doctor.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(doctor.id)}
                            title="Delete"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
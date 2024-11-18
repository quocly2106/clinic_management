import React, { useCallback, useEffect, useState } from "react";
import { allPatients, deletePatient } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Patient.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Patient() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPatients = useCallback(async () => {
    try {
      const patientsData = await allPatients();
      setPatients(patientsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
      showToastMessage("Error fetching patients data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (patientId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Patient No ${patientId}?`
    );
    if (!confirmDelete) return;
  
    try {
      const result = await deletePatient(patientId);
      if (result.success) {
        showToastMessage(
          `Patient No ${patientId} was deleted successfully.`,
          "success"
        );
        fetchPatients(); // Refresh danh sách sau khi xóa thành công
      } else {
        showToastMessage(
          `Error deleting patient: ${result.message}`,
          "error"
        );
      }
    } catch (error) {
      showToastMessage(
        `Error: ${error.message || "Unknown error"}`,
        "error"
      );
    }
  };
  

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.phone}`.toLowerCase();
    return fullName.includes(search);
  });

  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPatients.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="patient-wrapper">
      <div className="patient-container">
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
                placeholder="Search by phone..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            <button
              className="add-button"
              style={{
                background: colors.background,
              }}
              onClick={() => navigate("/admin/add-patient")}
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
                  <th>Frist Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Date Of Birth</th>
                  <th>Doctor Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="12" className="text-center">
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="no-data">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  currentPatients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.dateOfBirth}</td> 
                      <td>{patient.doctor ? patient.doctor.firstName + " " +  patient.doctor.lastName : "N/A"}</td> 
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/admin/edit-patient/${patient.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(patient.id)}
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

          {/* Phân trang */}
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`page-button ${
                  currentPage === number ? "active" : ""
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;

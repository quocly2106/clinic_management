import React, { useCallback, useEffect, useState } from "react";
import { allAppointments, deleteAppointment } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Appointment.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Appointment() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAppointments = useCallback(async () => {
    try {
      const appointmentsData = await allAppointments();
      setAppointments(appointmentsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
      showToastMessage("Error fetching appointments data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (appointmentId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Appointment No ${appointmentId}?`
    );
    if (!confirmDelete) return;
  
    try {
      const result = await deleteAppointment(appointmentId);
      if (result.success) {
        showToastMessage(
          `Appointment No ${appointmentId} was deleted successfully.`,
          "success"
        );
        fetchAppointments(); // Refresh danh sách sau khi xóa thành công
      } else {
        showToastMessage(
          `Error deleting appointment: ${result.message}`,
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
    fetchAppointments();
  }, [fetchAppointments]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (appointment.patient) {
      const fullName = `${appointment.patient.phone}`.toLowerCase();
      return fullName.includes(search);
    }
    return false; // Nếu không có bệnh nhân, không bao gồm trong kết quả
  });
  

  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAppointments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  const convertToLocalTime = (dateString) => {
    const date = new Date(dateString);
  
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: "Asia/Bangkok", 
    };
    
    const timePart = date.toLocaleTimeString("vi-VN", timeOptions);
    
    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: "Asia/Bangkok",
    };
    
    const datePart = date.toLocaleDateString("vi-VN", dateOptions);
  
    return `${timePart} ${datePart}`;
  };

  return (
    <div className="appointment-wrapper">
      <div className="appointment-container">
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
              className="add-button"
              style={{
                background: colors.background,
              }}
              onClick={() => navigate("/admin/add-appointment")}
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
                  <th>Patient Name</th>
                  <th>Patient Phone</th>
                  <th>Date Time</th>
                  <th>Reason</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>Doctor Name</th>
                  <th>Status</th>
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
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="no-data">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  currentAppointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{appointment.patient ? appointment.patient.firstName + " " +  appointment.patient.lastName : "N/A"}</td> 
                      <td>{appointment.patient ? appointment.patient.phone  : "N/A"}</td> 
                      <td>{convertToLocalTime(appointment.dateTime)}</td> 
                      <td>{appointment.reason}</td> 
                      <td>{convertToLocalTime(appointment.createdAt)}</td>
                      <td>{convertToLocalTime(appointment.updatedAt)}</td>
                      <td>{appointment.doctor ? appointment.doctor.firstName + " " +  appointment.doctor.lastName + "(" + appointment.doctor.specialty.name +  ")" : "N/A"}</td> 
                      <td>{appointment.status}</td> 
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/admin/edit-appointment/${appointment.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(appointment.id)}
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

export default Appointment;

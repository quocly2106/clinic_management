import React, { useEffect, useState, useCallback } from "react";
import { allReceptionists, deleteReceptionist } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import './Receptionist.css';
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from '../../../config/color';

function Receptionist() {
  const navigate = useNavigate();
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng receptionist trên mỗi trang

  const fetchReceptionists = useCallback(async () => {
    try {
      const receptionistsData = await allReceptionists();
      setReceptionists(receptionistsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching receptionists:", error);
      setLoading(false);
      showToastMessage("Error fetching receptionists data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (receptionistId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Receptionist No ${receptionistId}?`);
    if (!confirmDelete) return;

    try {
      const result = await deleteReceptionist(receptionistId);
      console.log("Delete result:", result);
      if (result && !result.error) {
        showToastMessage(`Receptionist No ${receptionistId} was deleted successfully.`, "success");
      } else {
        showToastMessage(`Error deleting receptionist: ${result.message || "Unknown error"}`, "error");
      }
      
      fetchReceptionists();
    } catch (error) {
      showToastMessage(`Error: ${error.message}`, "error");
    }
  };

  useEffect(() => {
    fetchReceptionists();
  }, [fetchReceptionists]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredReceptionist = receptionists.filter((receptionist) => {
    const fullName = `${receptionist.firstName} ${receptionist.lastName}`.toLowerCase();
    return fullName.includes(search);
  });

  // Tính toán các receptionist cần hiển thị
  const indexOfLastReceptionist = currentPage * itemsPerPage;
  const indexOfFirstReceptionist = indexOfLastReceptionist - itemsPerPage;
  const currentReceptionists = filteredReceptionist.slice(indexOfFirstReceptionist, indexOfLastReceptionist);

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredReceptionist.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="receptionist-wrapper">
      <div className="receptionist-container">
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
              onClick={() => navigate("/add-receptionist")}
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
                ) : currentReceptionists.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No receptionists found
                    </td>
                  </tr>
                ) : (
                  currentReceptionists.map((receptionist, index) => (
                    <tr key={receptionist.id}>
                      <td>{index + 1 + indexOfFirstReceptionist}</td>
                      <td>{receptionist.email}</td>
                      <td>{receptionist.firstName}</td>
                      <td>{receptionist.lastName}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/edit-receptionist/${receptionist.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(receptionist.id)}
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

        {/* Phân trang */}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`page-button ${currentPage === number ? "active" : ""}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Receptionist;

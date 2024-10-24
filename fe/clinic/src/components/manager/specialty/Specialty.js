import React, { useCallback, useEffect, useState } from "react";
import { allSpecialties, deleteSpecialty } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Specialty.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Specialty() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchSpecialties = useCallback(async () => {
    try {
      const specialtiesData = await allSpecialties();
      setSpecialties(specialtiesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      setLoading(false);
      showToastMessage("Error fetching specialties data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (specialtyId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Specialty No ${specialtyId}?`
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteSpecialty(specialtyId);
      console.log("Delete result:", result);
      if (result && !result.error) {
        showToastMessage(
          `Specialty No ${specialtyId} was deleted successfully.`,
          "success"
        );
      } else {
        showToastMessage(
          `Error deleting specialty: ${result.message || "Unknown error"}`,
          "error"
        );
      }

      fetchSpecialties();
    } catch (error) {
      showToastMessage(`Error: ${error.message}`, "error");
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredSpecialties = specialties.filter((specialty) => {
    const fullName = `${specialty.name}`.toLowerCase();
    return fullName.includes(search);
  });

  const indexOfLastSpecialty = currentPage * itemsPerPage;
  const indexOfFirstSpecialty = indexOfLastSpecialty - itemsPerPage;
  const currentSpecialties = filteredSpecialties.slice(
    indexOfFirstSpecialty,
    indexOfLastSpecialty
  );

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSpecialties.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="specialty-wrapper">
      <div className="specialty-container">
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
              onClick={() => navigate("/add-specialty")}
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date Created</th>
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
                ) : filteredSpecialties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No specialties found
                    </td>
                  </tr>
                ) : (
                  currentSpecialties.map((specialty, index) => (
                    <tr key={specialty.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{specialty.name}</td>
                      <td>{specialty.description}</td>
                      <td>{specialty.dateCreated}</td> 
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/edit-specialty/${specialty.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(specialty.id)}
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

export default Specialty;

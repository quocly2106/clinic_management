import React, { useCallback, useEffect, useState } from "react";
import { allAdmins} from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Admin.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Admin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAdmins = useCallback(async () => {
    try {
      const adminsData = await allAdmins();
      setAdmins(adminsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setLoading(false);
      showToastMessage("Error fetching admins data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };


  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredAdmins = admins.filter((admin) => {
    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    return fullName.includes(search);
  });

  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAdmin,
    indexOfLastAdmin
  );

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAdmins.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
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
                ) : filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No admins found
                    </td>
                  </tr>
                ) : (
                  currentAdmins.map((admin, index) => (
                    <tr key={admin.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{admin.email}</td>
                      <td>{admin.firstName}</td>
                      <td>{admin.lastName}</td>
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

export default Admin;

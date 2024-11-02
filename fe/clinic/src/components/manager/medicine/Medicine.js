import React, { useCallback, useEffect, useState } from "react";
import { allMedicines, deleteMedicine } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Medicine.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Medicine() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchMedicines = useCallback(async () => {
    try {
      const medicinesData = await allMedicines();
      setMedicines(medicinesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setLoading(false);
      showToastMessage("Error fetching medicines data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (medicineId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Medicine No ${medicineId}?`
    );
    if (!confirmDelete) return;
  
    try {
      const result = await deleteMedicine(medicineId);
      if (result.success) {
        showToastMessage(
          `Medicine No ${medicineId} was deleted successfully.`,
          "success"
        );
        fetchMedicines(); // Refresh danh sách sau khi xóa thành công
      } else {
        showToastMessage(
          `Error deleting medicine: ${result.message}`,
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
    fetchMedicines();
  }, [fetchMedicines]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const fullName = `${medicine.name}`.toLowerCase();
    return fullName.includes(search);
  });

  const indexOfLastMedicine = currentPage * itemsPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMedicines.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="medicine-wrapper">
      <div className="medicine-container">
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
              onClick={() => navigate("/admin/add-medicine")}
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
                  <th>Price</th>
                  <th>Quantity</th>
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
                ) : filteredMedicines.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No medicines found
                    </td>
                  </tr>
                ) : (
                  currentMedicines.map((medicine, index) => (
                    <tr key={medicine.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{medicine.name}</td>
                      <td>{medicine.description}</td>
                      <td>{medicine.price}</td> 
                      <td>{medicine.quantity}</td> 
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/admin/edit-medicine/${medicine.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(medicine.id)}
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

export default Medicine;

import React, { useCallback, useEffect, useState } from "react";
import { allEquipments, deleteEquipment } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Equipment.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Equipment() {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchEquipments = useCallback(async () => {
    try {
      const equipmentsData = await allEquipments();
      setEquipments(equipmentsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching equipments:", error);
      setLoading(false);
      showToastMessage("Error fetching equipments data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (equipmentId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Equipment No ${equipmentId}?`
    );
    if (!confirmDelete) return;
  
    try {
      const result = await deleteEquipment(equipmentId);
      if (result.success) {
        showToastMessage(
          `Equipment No ${equipmentId} was deleted successfully.`,
          "success"
        );
        fetchEquipments(); // Refresh danh sách sau khi xóa thành công
      } else {
        showToastMessage(
          `Error deleting equipment: ${result.message}`,
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
    fetchEquipments();
  }, [fetchEquipments]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredEquipments = equipments.filter((equipment) => {
    const fullName = `${equipment.name}`.toLowerCase();
    return fullName.includes(search);
  });

  const indexOfLastEquipment = currentPage * itemsPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - itemsPerPage;
  const currentEquipments = filteredEquipments.slice(
    indexOfFirstEquipment,
    indexOfLastEquipment
  );

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEquipments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="equipment-wrapper">
      <div className="equipment-container">
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
              onClick={() => navigate("/add-equipment")}
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
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Manufacturer</th>
                  <th>Maintenance Date</th>
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
                ) : filteredEquipments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No equipments found
                    </td>
                  </tr>
                ) : (
                  currentEquipments.map((equipment, index) => (
                    <tr key={equipment.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{equipment.name}</td>
                      <td>{equipment.type}</td>
                      <td>{equipment.quantity}</td> 
                      <td>{equipment.manufacturer}</td> 
                      <td>{equipment.maintenanceDate}</td> 
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/edit-equipment/${equipment.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(equipment.id)}
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

export default Equipment;

import React, { useCallback, useEffect, useState } from "react";
import { allServices, deleteService } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./Service.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function Service() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchServices = useCallback(async () => {
    try {
      const servicesData = await allServices();
      setServices(servicesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
      showToastMessage("Error fetching services data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Service No ${serviceId}?`
    );
    if (!confirmDelete) return;
  
    try {
      const result = await deleteService(serviceId);
      if (result.success) {
        showToastMessage(
          `Service No ${serviceId} was deleted successfully.`,
          "success"
        );
        fetchServices(); // Refresh danh sách sau khi xóa thành công
      } else {
        showToastMessage(
          `Error deleting service: ${result.message}`,
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
    fetchServices();
  }, [fetchServices]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredServices = services.filter((service) => {
    const fullName = `${service.name}`.toLowerCase();
    return fullName.includes(search);
  });

  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredServices.length / itemsPerPage); i++) {
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="service-wrapper">
      <div className="service-container">
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
              onClick={() => navigate("/admin/add-service")}
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
                  <th>Image</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
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
                ) : filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="no-data">
                      No services found
                    </td>
                  </tr>
                ) : (
                  currentServices.map((service, index) => (
                    <tr key={service.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{service.name}</td>
                      <td>{service.description}</td>
                      <td>
                        {service.image ? (
                          <img className="image-service"
                            src={`data:image/png;base64,${service.image}`}
                            alt={service.name}
                          />
                        ) : (
                          <div className="image-service-no">
                            No Image
                          </div>
                        )}
                      </td>
                      <td>{formatPrice(service.price)}</td>
                      <td>{service.duration} minutes</td>
                      <td>{service.status}</td> 
                      <td>{convertToLocalTime(service.createdAt)}</td>
                      <td>{convertToLocalTime(service.updatedAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/admin/edit-service/${service.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(service.id)}
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

export default Service;

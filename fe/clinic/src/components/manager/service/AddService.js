import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addService } from "../../utils/ApiFunction";
import "./AddService.css"

function AddService() {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    status: "Draft",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Service Data:", serviceData);
    try {
      await addService(serviceData);
      setSuccessMessage("Service added successfully!");
      setError("");
      setShowToast(true);
      setServiceData({
        name: "",
        description: "",
        price: "",
        duration: "",
        status: "Draft",
      });
      navigate("/service");
    } catch (error) {
      console.error("Error adding service:", error);
      setError("Failed to add service. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Service</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="name"
            name="name"
            value={serviceData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="description"
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number" step={0.01}
            className="form-control rounded-3"
            id="price"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            type="number"
            className="form-control rounded-3"
            id="duration"
            name="duration"
            value={serviceData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={serviceData.status}
            onChange={handleChange}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Service
        </button>
      </form>

      {/* Toast for success/error message */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div
            id="liveToast"
            className={`toast ${successMessage ? "bg-success" : "bg-danger"}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body text-white">
              {successMessage || error}
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddService;

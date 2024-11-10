import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addService } from "../../utils/ApiFunction";
import "./AddService.css";

function AddService() {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    status: "Active",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should not exceed 5MB");
        setShowToast(true);
        return;
      }

      // Kiểm tra định dạng file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or JPG)");
        setShowToast(true);
        return;
      }

      // Tạo URL preview cho ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setServiceData({ ...serviceData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (serviceData.price < 0) {
      setError("Price must be non-negative.");
      setShowToast(true);
      return;
    }
    if (serviceData.duration < 0) {
      setError("Duration must be non-negative.");
      setShowToast(true);
      return;
    }
  
    try {
      // Tạo đối tượng serviceDto
      const serviceDto = {
        name: serviceData.name,
        description: serviceData.description,
        price: parseFloat(serviceData.price),
        duration: parseInt(serviceData.duration),
        status: serviceData.status
      };
  
      // Gọi API với serviceDto và file ảnh
      await addService(serviceDto, serviceData.image);
      
      setSuccessMessage("Service added successfully!");
      setError("");
      setShowToast(true);
      setServiceData({
        name: "",
        description: "",
        price: "",
        duration: "",
        status: "Active",
        image: "",
      });
      setImagePreview(null); // Reset image preview
      navigate("/admin/service");
    } catch (error) {
      console.error("Error adding service:", error);
      setError(error.response?.data?.message || "Failed to add service. Please try again.");
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
            type="number"
            step={0.01}
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
            Duration(minutes)
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
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={serviceData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control rounded-3"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
                className="img-thumbnail"
              />
            </div>
          )}
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

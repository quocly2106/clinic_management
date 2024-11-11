import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditService.css";
import { api } from "../../utils/ApiFunction";

const EditService = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    status: "Active",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchServiceById = async (id) => {
      try {
        const response = await api.get(`/services/${id}`);
        const data = response.data;

        if (data.name && data.description) {
          setService({
            name: data.name,
            description: data.description,
            price: data.price,
            duration: data.duration,
            status: data.status,
            image: data.image,
          });
          setImagePreview(data.image ? `http://localhost:9191/img/${data.image}` : null);
        } else {
          toast.error("Fetched service data is incomplete");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceById(serviceId);
  }, [serviceId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, JPG)");
        return;
      }

      setService({ ...service, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Cập nhật preview ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    // Convert service data thành JSON và thêm vào formData
    formData.append(
      "serviceDto",
      new Blob(
        [
          JSON.stringify({
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
            status: service.status,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (service.image) {
      formData.append("image", service.image);
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:9191/services/update/${serviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to update service");
      }

      toast.success("Service updated successfully");
      setTimeout(() => {
        navigate("/admin/service");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={service.name}
                onChange={(e) =>
                  setService({ ...service, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={service.description}
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                step={0.01}
                className="form-control"
                value={service.price}
                onChange={(e) =>
                  setService({ ...service, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={service.duration}
                onChange={(e) =>
                  setService({ ...service, duration: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={service.status}
                onChange={(e) =>
                  setService({ ...service, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="mt-2 image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-preview"
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-save">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;

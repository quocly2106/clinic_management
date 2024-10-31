import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditService.css"; // Import CSS
import { api } from '../../utils/ApiFunction'; // Import your Axios instance

const EditService = () => {
  const {serviceId } = useParams();
  const [service, setService] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation after success

  useEffect(() => {
    const fetchServiceById = async (id) => {
      try {
        const response = await api.get(`/services/${id}`);
        const data = response.data;

        if (data.name && data.type) {
          setService({ name: data.name, description: data.description ,price: data.price , duration: data.duration, status: data.status});
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
  
    const updatedService = {
      name: service.name,
      description: service.description,
      price : service.price,
      duration: service.duration,
      status : service.status,
    };
    
    try {
      const response = await fetch(`http://localhost:9191/services/update/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedService),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Failed to update service: " + errorMessage);
      }
  
      // Nếu cập nhật thành công
      toast.success("Service updated successfully");
        setTimeout(() => {
          navigate('/service'); 
      }, 2000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
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
                type="number" step={0.01}
                className="form-control"
                value={service.price}
                onChange={(e) =>
                  setService({ ...service, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration</label>
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
                onChange={(e) => setService({ ...service, status: e.target.value })}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
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

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditEquipment.css"; // Import CSS
import { api } from '../../utils/ApiFunction'; // Import your Axios instance

const EditEquipment = () => {
  const {equipmentId } = useParams();
  const [equipment, setEquipment] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation after success

  useEffect(() => {
    const fetchEquipmentById = async (id) => {
      try {
        const response = await api.get(`/equipments/${id}`);
        const data = response.data;

        if (data.name && data.type) {
          setEquipment({ name: data.name, type: data.type ,quantity: data.quantity , manufacturer: data.manufacturer, maintenanceDate: data.maintenanceDate});
        } else {
          toast.error("Fetched equipment data is incomplete");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentById(equipmentId);
  }, [equipmentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
  
    const updatedEquipment = {
      name: equipment.name,
      type: equipment.type,
      quantity : equipment.quantity,
      manufacturer: equipment.manufacturer,
      maintenanceDate : equipment.maintenanceDate,
    };
    
    try {
      const response = await fetch(`http://localhost:9191/equipments/update/${equipmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEquipment),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Failed to update equipment: " + errorMessage);
      }
  
      // Nếu cập nhật thành công
      toast.success("Equipment updated successfully");
        setTimeout(() => {
          navigate('/equipment'); 
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
        <h2 className="form-title">Edit Equipment</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={equipment.name}
                onChange={(e) =>
                  setEquipment({ ...equipment, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Type</label>
              <input
                type="text"
                className="form-control"
                value={equipment.type}
                onChange={(e) =>
                  setEquipment({ ...equipment, type: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={equipment.quantity}
                onChange={(e) =>
                  setEquipment({ ...equipment, quantity: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                value={equipment.manufacturer}
                onChange={(e) =>
                  setEquipment({ ...equipment, manufacturer: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">maintenance Date</label>
              <input
                type="date"
                className="form-control"
                value={equipment.maintenanceDate}
                onChange={(e) =>
                  setEquipment({ ...equipment, maintenanceDate: e.target.value })
                }
              />
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

export default EditEquipment;

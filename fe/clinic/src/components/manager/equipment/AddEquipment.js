import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEquipment } from "../../utils/ApiFunction";

function AddEquipment() {
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    type: "",
    quantity: "",
    manafacturer: "",
    maintenanceDate: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({ ...equipmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Equipment Data:", equipmentData);
    try {
      await addEquipment(equipmentData);
      setSuccessMessage("Equipment added successfully!");
      setError("");
      setShowToast(true);
      setEquipmentData({
        name: "",
        type: "",
        quantity: "",
        manafacturer: "",
        maintenanceDate: "",
      });
      navigate("/equipment");
    } catch (error) {
      console.error("Error adding equipment:", error);
      setError("Failed to add equipment. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Equipment</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="name"
            name="name"
            value={equipmentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="type"
            name="type"
            value={equipmentData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control rounded-3"
            id="quantity"
            name="quantity"
            value={equipmentData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
          Manufacturer
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="manufacturer"
            name="manufacturer"
            value={equipmentData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Maintenance Date
          </label>
          <input
            type="date"
            className="form-control rounded-3"
            id="maintenanceDate"
            name="maintenanceDate"
            value={equipmentData.maintenanceDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Equipment
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

export default AddEquipment;

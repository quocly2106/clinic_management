import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../../utils/ApiFunction";

function AddMedicine() {
  const [medicineData, setMedicineData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Medicine Data:", medicineData);
    try {
      await addMedicine(medicineData);
      setSuccessMessage("Medicine added successfully!");
      setError("");
      setShowToast(true);
      setMedicineData({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
      navigate("/medicine");
    } catch (error) {
      console.error("Error adding medicine:", error);
      setError("Failed to add medicine. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Medicine</h2>
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
            value={medicineData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="description"
            name="description"
            value={medicineData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Price
          </label>
          <input
            type="number" step="0.01"
            className="form-control rounded-3"
            id="price"
            name="price"
            value={medicineData.price}
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
            value={medicineData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Medicine
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

export default AddMedicine;

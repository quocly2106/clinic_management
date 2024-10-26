import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpecialty } from "../../utils/ApiFunction";
import "./AddSpecialty.css"

function AddSpecialty() {
  const [specialtyData, setSpecialtyData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpecialtyData({ ...specialtyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Specialty Data:", specialtyData);
    try {
      await addSpecialty(specialtyData);
      setSuccessMessage("Specialty added successfully!");
      setError("");
      setShowToast(true);
      setSpecialtyData({
        name: "",
        description: "",
      });
      navigate("/specialty");
    } catch (error) {
      console.error("Error adding specialty:", error);
      setError("Failed to add specialty. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Specialty</h2>
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
            value={specialtyData.name}
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
            value={specialtyData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Specialty
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

export default AddSpecialty;

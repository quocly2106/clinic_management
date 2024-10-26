import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../../utils/ApiFunction";
import "./AddPatient.css"

function AddPatient() {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    doctorId: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Patient Data:", patientData);
    try {
      await addPatient(patientData);
      setSuccessMessage("Patient added successfully!");
      setError("");
      setShowToast(true);
      setPatientData({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        doctorId: "",
      });
      navigate("/patient");
    } catch (error) {
      console.error("Error adding patient:", error);
      setError("Failed to add patient. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Patient</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="firstName"
            name="firstName"
            value={patientData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="lastName"
            name="lastName"
            value={patientData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date Of Birth
          </label>
          <input
            type="date"
            className="form-control rounded-3"
            id="dateOfBirth"
            name="dateOfBirth"
            value={patientData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control rounded-3"
            id="phone"
            name="phone"
            value={patientData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="doctorId" className="form-label">
            Doctor Id
          </label>
          <input
            type="number"
            className="form-control rounded-3"
            id="doctorId"
            name="doctorId"
            value={patientData.doctorId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Patient
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

export default AddPatient;

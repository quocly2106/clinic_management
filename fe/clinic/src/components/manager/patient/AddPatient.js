import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../../utils/ApiFunction";
import "./AddPatient.css"

function AddPatient() {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  const today = new Date();
  const dob = new Date(patientData.dateOfBirth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dob >= today) {
      setError("Date of Birth must be in the past.");
      setShowToast(true);
      return;
    }

    if (patientData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      setShowToast(true);
      return;
    }

    if (!patientData.email.endsWith("@gmail.com")) {
      setError("Email phải có @gmail.com");
      setShowToast(true);
      return;
    }
    try {
      await addPatient(patientData);
      setSuccessMessage("Patient added successfully!");
      setError("");
      setShowToast(true);
      setPatientData({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        doctorId: "",
      });
      navigate("/admin/patient");
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="email"
            name="email"
            value={patientData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-control rounded-3"
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
            type="text"
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

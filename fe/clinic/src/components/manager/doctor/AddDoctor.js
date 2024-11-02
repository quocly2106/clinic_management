import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { addDoctor } from '../../utils/ApiFunction';
import "./AddDoctor.css"

function AddDoctor() {
  const [doctorData, setDoctorData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    specialtyId: '',
    role: 'DOCTOR',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Doctor Data:", doctorData);
    try {
      await addDoctor(doctorData);
      setSuccessMessage('Doctor added successfully!');
      setError('');
      setShowToast(true);
      setDoctorData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        specialtyId: '',
        role: 'DOCTOR',
      });
      navigate('/admin/doctor'); 
    } catch (error) {
      console.error("Error adding doctor:", error);
      setError('Failed to add doctor. Please try again.');
      setSuccessMessage('');
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Doctor</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="firstName"
            name="firstName"
            value={doctorData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="lastName"
            name="lastName"
            value={doctorData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control rounded-3"
            id="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control rounded-3"
            id="password"
            name="password"
            value={doctorData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialtyId" className="form-label">Specialty ID</label>
          <input
            type="number"
            className="form-control rounded-3"
            id="specialtyId"
            name="specialtyId"
            value={doctorData.specialtyId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Doctor</button>
      </form>

      {/* Toast for success/error message */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="liveToast" className={`toast ${successMessage ? 'bg-success' : 'bg-danger'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body text-white">
              {successMessage || error}
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDoctor;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {  addReceptionist } from '../../utils/ApiFunction';
import "./AddReceptionist.css"

function AddReceptionist() {
  const [receptionistData, setReceptionistData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'RECEPTIONIST',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceptionistData({ ...receptionistData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Receptionist Data:", receptionistData);
    try {
      await addReceptionist(receptionistData);
      setSuccessMessage('Receptionist added successfully!');
      setError('');
      setShowToast(true);
      setReceptionistData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: 'RECEPTIONIST',
      });
      navigate('/admin/receptionist'); 
    } catch (error) {
      console.error("Error adding receptionist:", error);
      setError('Failed to add receptionist. Please try again.');
      setSuccessMessage('');
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Receptionist</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="firstName"
            name="firstName"
            value={receptionistData.firstName}
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
            value={receptionistData.lastName}
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
            value={receptionistData.email}
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
            value={receptionistData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Receptionist</button>
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

export default AddReceptionist;

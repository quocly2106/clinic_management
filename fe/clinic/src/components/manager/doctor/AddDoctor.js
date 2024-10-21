import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addDoctor } from '../../utils/ApiFunction';

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
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Doctor Data:", doctorData); // Kiểm tra dữ liệu
    try {
      await addDoctor(doctorData);
      setSuccessMessage('Doctor added successfully!');
      setError('');
      setDoctorData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        specialtyId: '',
        role: 'DOCTOR',
      });
      navigate('/doctor'); // Chuyển hướng sau khi thêm bác sĩ thành công
    } catch (error) {
      console.error("Error adding doctor:", error); // Log chi tiết lỗi
      setError('Failed to add doctor. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Doctor</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            id="lastName"
            name="lastName"
            value={doctorData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
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
            className="form-control"
            id="specialtyId"
            name="specialtyId"
            value={doctorData.specialtyId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;

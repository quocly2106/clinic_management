import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { addAppointment } from '../../utils/ApiFunction';
import "./AddAppointment.css"

function AddAppointment() {
  const [appointmentData, setAppointmentData] = useState({
    dateTime: '',
    doctorId: '',
    patient: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      phone: '',
      receptionistId: '',
    },
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Kiểm tra xem thuộc tính là của patient hay appointment
    if (name.startsWith('patient.')) {
      const patientField = name.split('.')[1];
      setAppointmentData(prevData => ({
        ...prevData,
        patient: { ...prevData.patient, [patientField]: value }
      }));
    } else {
      setAppointmentData({ ...appointmentData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Appointment Data:", appointmentData);
    try {
      await addAppointment(appointmentData);
      setSuccessMessage('Appointment added successfully!');
      setError('');
      setShowToast(true);
      // Reset form
      setAppointmentData({
        dateTime: '',
        doctorId: '',
        patient: {
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          phone: '',
          receptionistId: '',
        },
      });
      navigate('/appointment'); 
    } catch (error) {
      console.error("Error adding appointment:", error);
      setError('Failed to add appointment. Please try again.');
      setSuccessMessage('');
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Appointment</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="doctorId" className="form-label">Doctor ID</label>
          <input
            type="number"
            className="form-control rounded-3"
            id="doctorId"
            name="doctorId"
            value={appointmentData.doctorId}
            onChange={handleChange}
            required
          />
        </div>
        <h4 className="mt-4">Patient Information</h4>
        <div className="mb-3">
          <label htmlFor="patient.firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="firstName"
            name="patient.firstName"
            value={appointmentData.patient.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patient.lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="lastName"
            name="patient.lastName"
            value={appointmentData.patient.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patient.gender" className="form-label">Gender</label>
          <select
            className="form-control rounded-3"
            id="gender"
            name="patient.gender"
            value={appointmentData.patient.gender}
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
          <label htmlFor="patient.dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control rounded-3"
            id="dateOfBirth"
            name="patient.dateOfBirth"
            value={appointmentData.patient.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patient.phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="phone"
            name="patient.phone"
            value={appointmentData.patient.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patient.receptionistId" className="form-label">Receptionist ID</label>
          <input
            type="number"
            className="form-control rounded-3"
            id="receptionistId"
            name="patient.receptionistId"
            value={appointmentData.patient.receptionistId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Appointment</button>
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

export default AddAppointment;

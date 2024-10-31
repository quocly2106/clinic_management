import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { addAppointment, allDoctors, allPatients } from '../../utils/ApiFunction';
import "./AddAppointment.css"

function AddAppointment() {
  const [appointmentData, setAppointmentData] = useState({
    dateTime: '',
    doctorId: '',
    patientId: '', // Thay đổi từ patient object sang patientId
    receptionistId: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]); // State lưu danh sách patients
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Fetch danh sách patients khi component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await allPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError('Failed to load patients list');
      }
    };
    const fetchDoctors = async () => {
      try {
        const data = await allDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError('Failed to load doctors list');
      }
    };
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAppointment(appointmentData);
      setSuccessMessage('Appointment added successfully!');
      setError('');
      setShowToast(true);
      // Reset form
      setAppointmentData({
        doctorId: '',
        patientId: '',
        receptionistId: ''
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
          <label htmlFor="doctorId" className="form-label">Select Doctor</label>
          <select
            className="form-control rounded-3"
            id="doctorId"
            name="doctorId"
            value={appointmentData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Patient</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {`${doctor.firstName} ${doctor.lastName} - ${doctor.specialty.name}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="patientId" className="form-label">Select Patient</label>
          <select
            className="form-control rounded-3"
            id="patientId"
            name="patientId"
            value={appointmentData.patientId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {`${patient.firstName} ${patient.lastName} - ${patient.phone}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="receptionistId" className="form-label">Receptionist ID</label>
          <input
            type="number"
            className="form-control rounded-3"
            id="receptionistId"
            name="receptionistId"
            value={appointmentData.receptionistId}
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
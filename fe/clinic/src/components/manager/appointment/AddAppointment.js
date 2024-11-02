import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { addAppointment, allDoctors, allPatients, allReceptionists } from '../../utils/ApiFunction';
import "./AddAppointment.css"

function AddAppointment() {
  const [appointmentData, setAppointmentData] = useState({
    dateTime: '',
    reason: '',
    doctorId: '',
    patientId: '', // Thay đổi từ patient object sang patientId
    receptionistId: ''
  });

  const [receptionists, setReceptionists] = useState([]);
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
    const fetchReceptionists = async () => {
      try {
        const data = await allReceptionists();
        setReceptionists(data);
      } catch (error) {
        console.error("Error fetching receptionists:", error);
        setError('Failed to load receptionist list');
      }
    };
    fetchPatients();
    fetchDoctors();
    fetchReceptionists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  const selectedDateTime = new Date(appointmentData.dateTime);
  const now = new Date();
  if (selectedDateTime <= now) {
      setError('Date and Time must be in the future.');
      return;
  }
    try {
      await addAppointment(appointmentData);
      setSuccessMessage('Appointment added successfully!');
      setError('');
      setShowToast(true);
      // Reset form
      setAppointmentData({
        dateTime: '',
        reason: '',
        doctorId: '',
        patientId: '',
        receptionistId: ''
      });
      navigate('/admin/appointment'); 
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
          <label htmlFor="receptionistId" className="form-label">Select Receptionist</label>
          <select
            className="form-control rounded-3"
            id="receptionistId"
            name="receptionistId"
            value={appointmentData.receptionistId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Receptionist</option>
            {receptionists.map(receptionist => (
              <option key={receptionist.id} value={receptionist.id}>
                {`${receptionist.firstName} ${receptionist.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dateTime" className="form-label"> Date & Time</label>
          <input
            type="datetime-local"
            className="form-control rounded-3"
            id="dateTime"
            name="dateTime"
            value={appointmentData.dateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reason" className="form-label"> Reason</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="reason"
            name="reason"
            value={appointmentData.reason}
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
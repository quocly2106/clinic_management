import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditAppointment.css";
import { allDoctors, allPatients, allReceptionists } from "../../utils/ApiFunction";

const EditAppointment = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState({
    doctorId: '',
    receptionistId: '',
    dateTime: '',
    reason: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receptionists, setReceptionists] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentById = async (id) => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:9191/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch appointment");
        
        const data = await response.json();
        setAppointment({
          doctorId: data.doctor.id,
          receptionistId: data.receptionist.id,
          dateTime: data.dateTime,
          reason: data.reason,
          status: data.status,
        });
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllData = async () => {
      try {
        const [doctorsData, receptionistsData] = await Promise.all([
          allDoctors(),
          allReceptionists(),
        ]);
        setDoctors(doctorsData);
        setReceptionists(receptionistsData);
      } catch (error) {
        setError('Failed to load data');
        toast.error('Failed to load data');
      }
    };

    fetchAppointmentById(appointmentId);
    fetchAllData();
  }, [appointmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:9191/appointments/update/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointment),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Failed to update appointment: " + errorMessage);
      }

      toast.success("Appointment updated successfully");
      setTimeout(() => navigate("/appointment"), 2000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          No appointment found
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="doctorId" className="form-label">Select Doctor</label>
            <select
              className="form-control rounded-3"
              id="doctorId"
              name="doctorId"
              value={appointment.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Select a Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {`${doctor.firstName} ${doctor.lastName} - ${doctor.specialty.name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date & Time</label>
            <input
              type="datetime-local"
              className="form-control rounded-3"
              name="dateTime"
              value={appointment.dateTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Reason</label>
            <input
              type="text"
              className="form-control"
              name="reason"
              value={appointment.reason}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={appointment.status}
              onChange={handleChange}
              required
            >
              <option value="Waiting">Waiting</option>
              <option value="Confirmed">Confirmed</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="receptionistId" className="form-label">Select Receptionist</label>
            <select
              className="form-control rounded-3"
              id="receptionistId"
              name="receptionistId"
              value={appointment.receptionistId}
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

          <button type="submit" className="btn btn-save">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;

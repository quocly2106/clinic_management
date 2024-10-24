import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditDoctor.css'; // Import CSS

const EditDoctor = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const fetchDoctorById = async (id) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:9191/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch doctor');
        }
        const data = await response.json();
        setDoctor(data);
        setSelectedSpecialty(data.specialtyId);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSpecialties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:9191/specialties/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch specialties');
        }
        const data = await response.json();
        setSpecialties(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    };

    fetchDoctorById(doctorId);
    fetchSpecialties();
  }, [doctorId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDoctor = {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialtyId: selectedSpecialty,  // Chỉ cập nhật specialty nếu nó có sự thay đổi
    };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9191/doctors/update/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDoctor),
      });
      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }
      toast.success('Doctor updated successfully');
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

  if (!doctor) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          No doctor found
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input 
                type="text" 
                className="form-control" 
                value={doctor.email || ''} 
                readOnly 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={doctor.firstName || ''}
                onChange={(e) => setDoctor({ ...doctor, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={doctor.lastName || ''}
                onChange={(e) => setDoctor({ ...doctor, lastName: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Specialty</label>
              <select
                className="form-select"
                value={selectedSpecialty || ''}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>
              <input 
                type="text" 
                className="form-control" 
                value={doctor.role || ''} 
                readOnly 
              />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctor;

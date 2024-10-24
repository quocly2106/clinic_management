import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditReceptionist.css'; // Import CSS

const EditReceptionist = () => {
  const { receptionistId } = useParams();
  const [receptionist, setReceptionist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceptionistById = async (id) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:9191/receptionists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch receptionist');
        }
        const data = await response.json();
        setReceptionist(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionistById(receptionistId);
  }, [receptionistId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedReceptionist = {
      firstName: receptionist.firstName,
      lastName: receptionist.lastName
    };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9191/receptionists/update/${receptionistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedReceptionist),
      });
      if (!response.ok) {
        throw new Error('Failed to update receptionist');
      }
      toast.success("Receptionist updated successfully");
        setTimeout(() => {
          navigate('/receptionist'); 
      }, 2000);
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

  if (!receptionist) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          No receptionist found
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit Receptionist</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input 
                type="text" 
                className="form-control" 
                value={receptionist.email || ''} 
                readOnly 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={receptionist.firstName || ''}
                onChange={(e) => setReceptionist({ ...receptionist, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={receptionist.lastName || ''}
                onChange={(e) => setReceptionist({ ...receptionist, lastName: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>
              <input 
                type="text" 
                className="form-control" 
                value={receptionist.role || ''} 
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

export default EditReceptionist;

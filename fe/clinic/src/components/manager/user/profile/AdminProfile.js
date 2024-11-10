import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminId = localStorage.getItem('adminId');
        const token = localStorage.getItem('token');

        if (!adminId) {
          throw new Error('Admin ID not found. Please log in again.');
        }

        const response = await fetch(`http://localhost:9191/admin/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch admin profile');
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!profile.firstName || !profile.lastName) {
      toast.error('First Name and Last Name cannot be empty');
      return;
    }
  
    const updatedAdmin = {
      firstName: profile.firstName,
      lastName: profile.lastName,
    };
    
    try {
      const adminId = localStorage.getItem('adminId');
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9191/admins/update/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAdmin), // Chỉnh sửa đúng cấu trúc JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      toast.success('Profile updated successfully');
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

  if (!profile) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          No profile found
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Admin Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input 
                type="text" 
                className="form-control" 
                value={profile.email || ''} 
                readOnly 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={profile.firstName || ''}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={profile.lastName || ''}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>
              <input 
                type="text" 
                className="form-control" 
                value={profile.role || ''} 
                readOnly 
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile; 
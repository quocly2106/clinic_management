import React, { useEffect, useState } from 'react';
import { getAdminProfile } from '../../../utils/ApiFunction';
// import './Profile.css';
import { Toast, ToastContainer } from 'react-bootstrap';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const adminId = localStorage.getItem('adminId');

        if (!adminId) {
          throw new Error('Admin ID not found. Please log in again.');
        }

        const adminProfile = await getAdminProfile(adminId);
        setProfile(adminProfile);
      } catch (err) {
        setError(err.message);
        setShowToast(true); // Show toast if error occurs
      }
    };

    fetchProfile();
  }, []);

  const handleToastClose = () => setShowToast(false);

  if (error) {
    return (
      <div className="container profile-container">
        <ToastContainer className="p-3" position="top-end">
          <Toast show={showToast} onClose={handleToastClose} bg="danger" delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
        <h2>Error Loading Profile</h2>
        <button className="btn btn-primary mt-3" onClick={() => window.location.href = '/login'}>
          Return to Login
        </button>
      </div>
    );
  }

  if (!profile) {
    return <div className="container profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container full-frame">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Admin Profile</h1>
          <p className="card-text"><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p className="card-text"><strong>Email:</strong> {profile.email}</p>
          <p className="card-text"><strong>Role:</strong> {profile.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

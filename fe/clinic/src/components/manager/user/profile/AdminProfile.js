import React, { useEffect, useState } from 'react';
import { getAdminProfile } from '../../../utils/ApiFunction';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
  
        // Try to retrieve the admin ID
        const adminId = localStorage.getItem('adminId');

        if (!adminId) {
          throw new Error('Admin ID not found. Please log in again.');
        }
  
        // Fetch admin profile
        const adminProfile = await getAdminProfile(adminId);
        console.log('Admin Profile:', adminProfile); // Log the fetched admin profile
        setProfile(adminProfile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      }
    };
  
    fetchProfile();
  }, []);
  
  if (error) {
    return (
      <div>
        <h2>Error Loading Profile</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/login'}>
          Return to Login
        </button>
      </div>
    );
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Profile</h1>
      <p>Name: {profile.firstName} {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default AdminProfile;
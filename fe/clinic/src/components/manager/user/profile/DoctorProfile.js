import React, { useEffect, useState } from 'react';
import { getDoctorProfile } from '../../../utils/ApiFunction';

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Try to retrieve the doctor ID
        const doctorId = localStorage.getItem('doctorId');

        if (!doctorId) {
          throw new Error('Doctor ID not found. Please log in again.');
        }
        const doctorProfile = await getDoctorProfile(doctorId);
        setProfile(doctorProfile);
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
      <h1>Doctor Profile</h1>
      <p>Name: {profile.firstName} {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Specialty: {profile.specialty ? profile.specialty.name : 'N/A'}</p>
    </div>
  );
};

export default DoctorProfile;
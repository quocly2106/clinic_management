import React, { useEffect, useState } from 'react';
import { getReceptionistProfile } from '../../../utils/ApiFunction'; // Giả sử bạn đã tạo hàm này trong utils

const ReceptionistProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Try to retrieve the receptionist ID
                const receptionistId = localStorage.getItem("receptionistId");

                if (!receptionistId) {
                    throw new Error('Receptionist ID not found. Please log in again.');
                }
                const receptionistProfile = await getReceptionistProfile(receptionistId);
                setProfile(receptionistProfile);
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
            <h1>Receptionist Profile</h1>
            <p>Name: {profile.firstName} {profile.lastName}</p>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
            {profile.image && <p>Image: <img src={profile.image} alt="Profile" /></p>}
        </div>
    );
    
};

export default ReceptionistProfile;

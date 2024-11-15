import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const ReceptionistProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchReceptionistProfile = async () => {
      try {
        const receptionistId = localStorage.getItem('receptionistId');
        const token = localStorage.getItem('token');

        if (!receptionistId) {
          throw new Error('Receptionist ID not found. Please log in again.');
        }

        const response = await fetch(`http://localhost:9191/receptionists/${receptionistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch receptionist profile');
        }

        const data = await response.json();
        setProfile(data);

        if (data.image) {
          setImagePreview(`http://localhost:9191/img/${data.image}`);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionistProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!profile.firstName || !profile.lastName) {
      toast.error('First Name and Last Name cannot be empty');
      return;
    }

    try {
      const receptionistId = localStorage.getItem('receptionistId');
      const token = localStorage.getItem('token');

      const formData = new FormData();

      // Tạo receptionistDto blob
      const receptionistDto = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        role: profile.role,
      };

      formData.append(
        'receptionistDto',
        new Blob([JSON.stringify(receptionistDto)], { type: 'application/json' })
      );

      // Thêm ảnh nếu có
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch(
        `http://localhost:9191/receptionists/update/${receptionistId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setProfile(updatedData);

      if (updatedData.image) {
        setImagePreview(`http://localhost:9191/img/${updatedData.image}`);
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
      <div className="container">
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
        <div className="row">
          {/* Cột trái - Ảnh đại diện */}
          <div className="col-md-4">
            <div className="profile-image-container">
              <div className="profile-image">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" />
                ) : (
                  <i className="bi bi-person-circle default-avatar"></i>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="profile-image" className="btn btn-outline-primary">
                  <i className="bi bi-camera me-2"></i>Change Photo
                </label>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                />
              </div>
            </div>
          </div>

          {/* Cột phải - Thông tin */}
          <div className="col-md-8">
            <h2 className="form-title">Receptionist Profile</h2>
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
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.lastName || ''}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
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
              <div className="mt-4">
                <button type="submit" className="btn btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistProfile;

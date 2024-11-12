import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditSpecialty.css"; // Import CSS
import { api } from "../../utils/ApiFunction"; // Import your Axios instance

const EditSpecialty = () => {
  const { specialtyId } = useParams();
  const [specialty, setSpecialty] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate(); // For navigation after success

  useEffect(() => {
    const fetchSpecialtyById = async (id) => {
      try {
        const response = await api.get(`/specialties/${id}`);
        const data = response.data;

        if (data.name && data.description) {
          setSpecialty({
            name: data.name,
            description: data.description,
            image: data.image,
          });
          setImagePreview(
            data.image ? `http://localhost:9191/img/${data.image}` : null
          );
        } else {
          toast.error("Fetched specialty data is incomplete");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialtyById(specialtyId);
  }, [specialtyId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, JPG)");
        return;
      }

      setImagePreview(URL.createObjectURL(file)); // Update image preview
      setSpecialty((prev) => ({ ...prev, image: file })); // Store image for form submission
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    // Use "specialtyDto" instead of "serviceDto" as the key name
    formData.append(
      "specialtyDto",
      new Blob(
        [
          JSON.stringify({
            name: specialty.name,
            description: specialty.description,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (specialty.image) {
      formData.append("image", specialty.image);
    }

    try {
      const response = await fetch(
        `http://localhost:9191/specialties/update/${specialtyId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Failed to update specialty: " + errorMessage);
      }

      toast.success("Specialty updated successfully");
      setTimeout(() => {
        navigate("/admin/specialty");
      }, 2000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
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

  if (error) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit Specialty</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={specialty.name}
                onChange={(e) =>
                  setSpecialty({ ...specialty, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={specialty.description}
                onChange={(e) =>
                  setSpecialty({ ...specialty, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="mt-2 image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-preview"
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-save">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSpecialty;

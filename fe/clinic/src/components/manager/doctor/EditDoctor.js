import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditDoctor.css"; // Import CSS

const EditDoctor = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [file, setFile] = useState(null); // State for the file upload
  const navigate = useNavigate();

  // Lấy role từ localStorage
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchDoctorById = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:9191/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch doctor");
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
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:9191/specialties/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch specialties");
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
  
    // Create doctorDto object containing all the necessary fields
    const doctorDto = {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      experience: doctor.experience,
      description: doctor.description,
      specialtyId: selectedSpecialty,
    };
  
    // Create FormData object to append doctorDto and file (only if the file is present)
    const formData = new FormData();
    formData.append("doctorDto", new Blob([JSON.stringify(doctorDto)], {
      type: "application/json"
    }));
    if (file) {
      formData.append("file", file); // Append the file if it's provided
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:9191/doctors/update/${doctorId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // Send the FormData with or without the file
        }
      );
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Update failed:", errorMessage);
        throw new Error("Failed to update doctor: " + errorMessage);
      }
  
      toast.success("Doctor updated successfully");
      // Redirect after successful update
      setTimeout(() => {
        navigate("/admin/doctor");
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={doctor.firstName || ""}
                onChange={(e) =>
                  setDoctor({ ...doctor, firstName: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={doctor.lastName || ""}
                onChange={(e) =>
                  setDoctor({ ...doctor, lastName: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={doctor.email || ""}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Experience</label>
              <input
                type="number"
                className="form-control"
                value={doctor.experience || ""}
                onChange={(e) =>
                  setDoctor({ ...doctor, experience: e.target.value })
                }
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={doctor.description || ""}
                onChange={(e) =>
                  setDoctor({ ...doctor, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                value={doctor.role || ""}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Specialty</label>
              {userRole === "admin" ? (
                <select
                  className="form-select"
                  value={selectedSpecialty || ""}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  value={specialties.find(
                    (specialty) => specialty.id === selectedSpecialty
                  )?.name || ""}
                  readOnly
                />
              )}
            </div>

            {/* File Upload Section */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Upload File (Optional)</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
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

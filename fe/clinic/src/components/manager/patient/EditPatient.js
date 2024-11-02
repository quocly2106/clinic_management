import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditPatient.css"; // Import CSS

const EditPatient = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientById = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:9191/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch patient");
        }
        const data = await response.json();
        setPatient(data);
        setSelectedDoctor(data.doctorId);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:9191/doctors/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    };

    fetchPatientById(patientId);
    fetchDoctors();
  }, [patientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Kiểm tra số điện thoại có đủ 10 số không
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(patient.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return; 
    }

    // Kiểm tra ngày sinh phải là ngày trong quá khứ
    const birthDate = new Date(patient.dateOfBirth);
    const today = new Date();
    if (birthDate >= today) {
      toast.error("Date of Birth must be in the past");
      return; 
    }

    const updatedPatient = {
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth,
      doctorId: selectedDoctor, // Chỉ cập nhật doctor nếu nó có sự thay đổi
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:9191/patients/update/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // Lấy thông báo lỗi từ server
        console.error("Update failed:", errorMessage);
        throw new Error("Failed to update patient: " + errorMessage);
      }

      // Nếu cập nhật thành công, hiển thị toast và sau đó chuyển hướng
      toast.success("Patient updated successfully");

      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate("/admin/patient");
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

  if (!patient) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          No patient found
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={patient.firstName || ""}
                onChange={(e) =>
                  setPatient({ ...patient, firstName: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={patient.lastName || ""}
                onChange={(e) =>
                  setPatient({ ...patient, lastName: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-control rounded-3"
                id="gender"
                name="gender"
                value={patient.gender || ""}
                onChange={(e) =>
                  setPatient({ ...patient, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={patient.phone || ""}
                onChange={(e) =>
                  setPatient({ ...patient, phone: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                value={patient.dateOfBirth || ""}
                onChange={(e) =>
                  setPatient({ ...patient, dateOfBirth: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Doctor Name</label>
              <select
                className="form-select"
                value={selectedDoctor || ""}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.firstName} {doctor.lastName} (
                    {doctor.specialty.name})
                  </option>
                ))}
              </select>
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

export default EditPatient;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoctor } from "../../utils/ApiFunction";
import "./AddDoctor.css";

function AddDoctor() {
  const [doctorData, setDoctorData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    specialtyId: "",
    role: "DOCTOR",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should not exceed 5MB");
        setShowToast(true);
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or JPG)");
        setShowToast(true);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setDoctorData((prevState) => ({ ...prevState, image: file }));

      // Cleanup URL to prevent memory leaks
      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setDoctorData((prevState) => ({ ...prevState, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Doctor Data:", doctorData);
    try {
      const doctorDto = {
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        email: doctorData.email,
        password: doctorData.password,
        specialtyId: doctorData.specialtyId,
      };

      const response = await addDoctor(doctorDto, doctorData.image);

      // Nếu backend trả về URL ảnh, thêm timestamp để đảm bảo hình ảnh mới nhất luôn hiển thị
      const imageUrl = `${response.imageUrl}?timestamp=${new Date().getTime()}`;

      setSuccessMessage("Doctor added successfully!");
      setError("");
      setShowToast(true);
      setDoctorData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        specialtyId: "",
        role: "DOCTOR",
        image: "",
      });
      setImagePreview(imageUrl);
      navigate("/admin/doctor");
    } catch (error) {
      console.error("Error adding doctor:", error);
      setError("Failed to add doctor. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Doctor</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="firstName"
            name="firstName"
            value={doctorData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="lastName"
            name="lastName"
            value={doctorData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-3"
            id="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-3"
            id="password"
            name="password"
            value={doctorData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialtyId" className="form-label">
            Specialty ID
          </label>
          <input
            type="number"
            className="form-control rounded-3"
            id="specialtyId"
            name="specialtyId"
            value={doctorData.specialtyId}
            onChange={handleChange}
            required
          />
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control rounded-3"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  key={imagePreview} // Force React to rerender
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                  className="img-thumbnail"
                />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Doctor
        </button>
      </form>

      {/* Toast for success/error message */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div
            id="liveToast"
            className={`toast ${successMessage ? "bg-success" : "bg-danger"}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body text-white">
              {successMessage || error}
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDoctor;

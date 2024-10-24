import React, { useState } from "react";
import { register } from "../../../utils/ApiFunction";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra xem mật khẩu có trùng khớp không
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setToastType("danger");
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {
      // Gọi hàm đăng ký
      await register(formData);
      setSuccess("Registration successful! Please login.");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Xử lý lỗi từ server
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setToastType("danger");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastType}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastType === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {error || success}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Please fill in the information below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstNameInput"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="firstNameInput">First Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastNameInput"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="lastNameInput">Last Name</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="emailInput">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="passwordInput">Password</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPasswordInput">Confirm Password</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-100 mb-3"
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

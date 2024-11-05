import React, { useState } from "react";
import { login } from "../../../utils/ApiFunction";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = { email, password };
      const response = await login(data);

      if (response && response.token) {
        const parsedToken = JSON.parse(response.token);

        const { token, role } = parsedToken;
        const doctorId = parsedToken.doctorId?.toString() || null;
        const receptionistId = parsedToken.receptionistId?.toString() || null;
        const adminId = parsedToken.adminId?.toString() || null;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role.toUpperCase());

        localStorage.removeItem("doctorId");
        localStorage.removeItem("receptionistId");
        localStorage.removeItem("adminId");

        if (role.toLowerCase() === "doctor" && doctorId) {
          localStorage.setItem("doctorId", doctorId);
        } else if (role.toLowerCase() === "receptionist" && receptionistId) {
          localStorage.setItem("receptionistId", receptionistId);
        } else if (role.toLowerCase() === "admin" && adminId) {
          localStorage.setItem("adminId", adminId);
        }

        onLogin(email, token, role.toUpperCase());
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed. Please try again.");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer className="p-3" position="top-end">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          bg="danger"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{error}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your credentials to login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="emailInput">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="passwordInput">Password</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-100 mb-3"
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
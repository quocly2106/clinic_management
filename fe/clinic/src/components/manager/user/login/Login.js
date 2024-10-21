import React, { useState } from "react";
import { login } from "../../../utils/ApiFunction";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      const data = { email, password };
      const response = await login(data);
      console.log("Response from login: ", response);
  
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
        navigate("/");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}
    >
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-100"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

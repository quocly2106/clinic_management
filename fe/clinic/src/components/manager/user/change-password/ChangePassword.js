import React, { useEffect, useState } from "react";
import { changeAdminPassword, changeDoctorPassword, changeReceptionistPassword } from "../../../utils/ApiFunction";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ role: "", id: "" });

  useEffect(() => {
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('adminId') || localStorage.getItem('doctorId') || localStorage.getItem('receptionistId');
    setUserInfo({ role, id });
    console.log("User info from localStorage:", { role, id });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    const data = { oldPassword, newPassword };
  
    try {
      let response;
  
      switch(userInfo.role.toUpperCase()) {
        case "ADMIN":
          response = await changeAdminPassword(userInfo.id, data);
          break;
        case "DOCTOR":
          response = await changeDoctorPassword(userInfo.id, data);
          break;
        case "RECEPTIONIST":
          response = await changeReceptionistPassword(userInfo.id, data);
          break;
        default:
          throw new Error(`Invalid user role: ${userInfo.role}`);
      }
  
      console.log("API response:", response);
  
      if (response && (response.message || response === "Password changed successfully")) {
        setSuccessMessage(response.message || "Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      } else {
        setError("Password change failed. Please try again.");
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.message || err.message || "Password change failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Change Password</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
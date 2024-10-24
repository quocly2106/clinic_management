import React, { useEffect, useState } from "react";
import { changeAdminPassword, changeDoctorPassword, changeReceptionistPassword } from "../../../utils/ApiFunction";
import { Toast, ToastContainer } from "react-bootstrap";
import './ChangePassword.css'; // Thêm file CSS

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ role: "", id: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

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
        setToastType("success");
      } else {
        setError("Password change failed. Please try again.");
        setToastType("danger");
      }
      setShowToast(true);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.message || err.message || "Password change failed. Please try again.");
      setToastType("danger");
      setShowToast(true);
    }
  };

  return (
    <div className="change-password-container mt-5">
      <h2 className="mb-4 text-center">Change Password</h2>
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
        <button type="submit" className="btn btn-primary w-100">Change Password</button>
      </form>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastType}>
          <Toast.Header closeButton>
            <strong className="me-auto">{toastType === "success" ? "Success" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body>{toastType === "success" ? successMessage : error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ChangePassword;

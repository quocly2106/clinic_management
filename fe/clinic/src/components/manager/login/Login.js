// src/components/manager/login/Login.js
import React, { useState } from 'react';
import { login } from './../../utils/ApiFunction'; // Cập nhật đường dẫn đúng đến tệp api của bạn
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi trước đó nếu có
    setIsLoading(true); // Hiển thị trạng thái đang tải
    try {
      const Data = { email, password };
      const response = await login(Data); // Gọi API login
      localStorage.setItem("token", response.token); // Lưu token

      // Gọi hàm onLogin với địa chỉ email
      onLogin(email); // Truyền email của người dùng vào onLogin
      navigate("/"); // Chuyển hướng đến trang home
    } catch (err) {
      setError(err.message); // Gán lỗi từ server vào state error
    } finally {
      setIsLoading(false); // Ẩn trạng thái đang tải
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-primary w-100">{isLoading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { login } from '../../../utils/ApiFunction';
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true); 
    try {
      const Data = { email, password };
      const response = await login(Data);
      
      // Kiểm tra xem token có hợp lệ không
      if (response.token) {
        localStorage.setItem("token", response.token); 
        localStorage.setItem("email", email); // Lưu email vào localStorage
  
        onLogin(email); 
        navigate("/"); 
      } else {
        throw new Error("Login failed"); // Thêm thông báo lỗi nếu không có token
      }
    } catch (err) {
      setError(err.message); 
    } finally {
      setIsLoading(false); 
    }
  };
  
  return (
    <div className="container" style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="email" className="form-control" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-primary w-100">{isLoading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;

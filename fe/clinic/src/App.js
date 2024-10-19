// src/App.js
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/manager/login/Login";
import Home from "./components/manager/home/Home"; // Import Home
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(''); // State để lưu tên người dùng

  const handleLogin = (email) => { // Cập nhật hàm để nhận email
    setIsAuthenticated(true);
    setUserName(email); // Lưu email vào state
  };

  return (
    <Router>
      <Routes>
        {/* Hiển thị trang login ban đầu */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Nếu đã đăng nhập, chuyển đến Home */}
        <Route path="/" element={isAuthenticated ? (
          <Home userName={userName} /> // Truyền userName vào Home
        ) : (
          <Navigate to="/login" /> // Nếu chưa đăng nhập, chuyển đến trang login
        )} />
      </Routes>
    </Router>
  );
}

export default App;

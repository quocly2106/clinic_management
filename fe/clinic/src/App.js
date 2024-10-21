import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/manager/navbar/Navbar';
import Login from "./components/manager/user/login/Login";
import Home from "./components/manager/home/Home";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");
      setUserName(email || '');
      setUserRole(role ? role.toLowerCase() : '');
    }
  }, []);

  const handleLogin = (email, token, role) => {
  setIsAuthenticated(true);
  setUserName(email);
  setUserRole(role.toLowerCase());  // Ensure role is lowercase
  localStorage.setItem("email", email);
  localStorage.setItem("token", token);
  localStorage.setItem("role", role.toLowerCase());
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserRole('');
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  return (
    <>
      {isAuthenticated && <Navbar userName={userName} userRole={userRole} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="*" element={isAuthenticated ? <Home userRole={userRole} /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;

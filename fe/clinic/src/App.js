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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const email = localStorage.getItem("email");
      setUserName(email || '');
    }
  }, []);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserName(email);
    localStorage.setItem("email", email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <>
      {isAuthenticated && <Navbar userName={userName} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="*" element={isAuthenticated ? <Home userName={userName} /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;

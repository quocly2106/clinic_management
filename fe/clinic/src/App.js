import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SideBar />} />
      </Routes>
    </Router>
  );
}

export default App;

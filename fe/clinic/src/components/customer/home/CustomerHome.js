import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CustomerNavbar from "../navbar/CustomerNavbar";
import CustomerFooter from "../footer/CustomerFooter";
import "./CustomerHome.css";
import Banner from "../banner/Banner";
import About from "../about/About";
import Info from "../info/Info";
import Reviews from "../reviews/Reviews";
import BookAppointment from "../book-appointment/BookAppointment";
import ServiceAll from "../service/ServiceAll";
import SpecialtyAll from "../specialties/SepcialtiesAll"; // Giả sử bạn đã có component SpecialtyAll
import Doctors from '../doctors/Doctors';

function CustomerHome() {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate("/service"); // Điều hướng đến đường dẫn /service
  };

  const handleSpecialtyClick = () => {
    navigate("/specialty"); // Điều hướng đến đường dẫn /specialty
  };

  return (
    <div className="page-container">
      <CustomerNavbar onServiceClick={handleServiceClick} onSpecialtyClick={handleSpecialtyClick} />
      <div className="content-wrap">
        <Routes>
          {/* Route mặc định hiển thị tất cả các phần */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Info />
                <About />
                <BookAppointment />
                <Reviews />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<ServiceAll />} />
          <Route path="/specialty" element={<SpecialtyAll />} />
          <Route path="/doctors/:specialtyId" element={<Doctors />} />
        </Routes>
      </div>
      <CustomerFooter />
    </div>
  );
}

export default CustomerHome;

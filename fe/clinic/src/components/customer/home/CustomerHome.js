import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import CustomerNavbar from "../navbar/CustomerNavbar";
import CustomerFooter from "../footer/CustomerFooter";
import "./CustomerHome.css";
import Banner from "../banner/Banner";
import About from "../about/About";
import Info from "../info/Info";
import Reviews from "../reviews/Reviews";
import BookAppointment from "../book-appointment/BookAppointment";
import ServiceAll from "../service/ServiceAll";
import SpecialtyAll from "../specialties/SepcialtiesAll"; // Assuming you have a SpecialtyAll component

function CustomerHome() {
  const [showServices, setShowServices] = useState(false); // Trạng thái cho việc hiển thị "Dịch vụ"
  const [showSpecialties, setShowSpecialties] = useState(false); // Trạng thái cho việc hiển thị "Chuyên khoa"

  const handleServiceClick = () => {
    setShowServices(true);
    setShowSpecialties(false); // Nếu dịch vụ được chọn thì không hiển thị chuyên khoa
  };

  const handleSpecialtyClick = () => {
    setShowSpecialties(true);
    setShowServices(false); // Nếu chuyên khoa được chọn thì không hiển thị dịch vụ
  };

  return (
    <div className="page-container">
      <CustomerNavbar onServiceClick={handleServiceClick} onSpecialtyClick={handleSpecialtyClick} />
      <div className="content-wrap">
        {/* Chỉ hiển thị các phần nếu chưa chọn "Dịch vụ" hoặc "Chuyên khoa" */}
        {!showServices && !showSpecialties && (
          <>
            <Banner />
            <Info />
            <About />
            <BookAppointment />
            <Reviews />
          </>
        )}
        
        <div className="container-fluid">
          {/* Hiển thị ServiceAll khi chọn "Dịch vụ" */}
          {showServices && <ServiceAll />}
          
          {/* Hiển thị SpecialtyAll khi chọn "Chuyên khoa" */}
          {showSpecialties && <SpecialtyAll />}
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
}

export default CustomerHome;

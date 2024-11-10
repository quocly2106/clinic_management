import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerNavbar from "../navbar/CustomerNavbar";
import CustomerFooter from "../footer/CustomerFooter";
import "./CustomerHome.css";
import Banner from "../banner/Banner";
import Services from "../service/Services";
import About from "../about/About";
import Info from "../info/Info";

import Reviews from "../reviews/Reviews";
import BookAppointment from "../book-appointment/BookAppointment";



function CustomerHome() {
  return (
    <div className="page-container">
      <CustomerNavbar />
      <div className="content-wrap">
        <Banner />
        <Info/>
        <About/>
        <BookAppointment/>
        <Reviews/>
        <div className="container-fluid">
          <Routes>
            <Route path="/services" element={<Services />} />
            {/* <Route path="/appointment" element={<BookAppointment />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
}

export default CustomerHome;

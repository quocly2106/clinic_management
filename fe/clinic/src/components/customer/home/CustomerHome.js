import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerNavbar from "../navbar/CustomerNavbar";
import CustomerFooter from "../footer/CustomerFooter";
import "./CustomerHome.css";
import Banner from "../banner/Banner";
import Services from "../service/Services";
;


function CustomerHome() {
  return (
    <div className="page-container">
      <CustomerNavbar />
      <div className="content-wrap">
        <Banner />
        <div className="container-fluid">
          <Routes>
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
}

export default CustomerHome;

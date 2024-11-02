import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CustomerNavbar from '../navbar/CustomerNavbar';
import Index from '../index/Index';

function CustomerHome() {
    return (
        <>
          <CustomerNavbar />
          <div className="container-fluid mt-4">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </div>
        </>
      );
    }

export default CustomerHome

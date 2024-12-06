import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CustomerNavbar.css";
import { toast } from "react-toastify";

function CustomerNavbar({ onServiceClick , onSpecialtyClick}) {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Nhân Tâm <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-links">
            Về chúng tôi
          </Link>
        </li>
        <li>
          <Link to="/service" className="navbar-links">
            Dịch vụ
          </Link>
        </li>
        <li>
          <Link to="/specialty" className="navbar-links">
            Chuyên khoa
          </Link>
        </li>
        <li>  
          <Link to="/newss" className="navbar-links">
            Tin tức
          </Link>
        </li>
        <li>
          <Link to="/appointment" className="navbar-links">
            Đặt lịch
          </Link>
        </li>
      </ul>

      <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Chat trực tiếp
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/about">
              Về chúng tôi 
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/service">
              Dịch vụ
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/specialty">
              Chuyên khoa
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/newss">
              Tin tức
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/appointment">
              Đặt lịch
            </Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default CustomerNavbar;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerFooter.css"; // Đảm bảo bạn import CSS đã tạo
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

function CustomerFooter() {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="justify-content-between">
          {/* Phần Logo và Giới thiệu */}
          <Col md={5} sm={12}>
            <Link className="navbar-brand" to="/">
              <div className="brand-container">
                <div className="logo-container">
                  <div className="logo-circle">
                    <div className="circle-border"></div>
                    <div className="cross cross-vertical"></div>
                    <div className="cross cross-horizontal"></div>
                  </div>
                </div>
                <div className="text">Nhân Tâm</div>
              </div>
            </Link>
            <p className="footer-description">
              Chúng tôi cung cấp dịch vụ y tế hàng đầu với đội ngũ bác sĩ chuyên
              nghiệp và tận tâm.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={36} />
              </a>
              <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
                <SiZalo size={36} />
              </a>
              <a href="mailto:contact@nhantam.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                <FaEnvelope size={36} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={36} />
              </a>
            </div>
          </Col>

          {/* Phần Danh mục */}
          <Col md={3} sm={12} className="footer-links">
            <h5>Danh mục</h5>
            <ul>
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/about">Giới thiệu</a>
              </li>
              <li>
                <a href="/services">Dịch vụ</a>
              </li>
              <li>
                <a href="/doctors">Bác sĩ</a>
              </li>
              <li>
                <a href="/appointment">Đặt lịch</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </Col>

          {/* Phần Contact Us */}
          <Col md={4} sm={12} className="contact-info">
            <h5>Liên hệ với chúng tôi</h5>
            <p>Email: contact@nhantam.com</p>
            <p>Điện thoại: 0123 456 789</p>
            <p>Địa chỉ 1 : 123 Đường Y Tế, Thành phố Hồ Chí Minh</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default CustomerFooter;

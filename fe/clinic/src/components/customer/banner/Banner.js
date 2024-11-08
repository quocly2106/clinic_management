import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <Container className="align-items-center">
        <Row className="full-width">
          <Col lg={6} md={12} className="banner-content">
            <div className="welcome-text">
              <h1>Chào mừng đến với phòng khám Nhân Tâm</h1>
              <p>
                Phòng Khám Nhân Tâm là địa chỉ chăm sóc sức khỏe uy tín, chuyên
                nghiệp với sứ mệnh cung cấp dịch vụ y tế tiên tiến, hiệu quả và
                nhân văn. Chúng tôi hướng tới tầm nhìn trở thành phòng khám hàng
                đầu, đóng góp cho một cộng đồng khỏe mạnh và hạnh phúc. Với đội
                ngũ bác sĩ giàu kinh nghiệm và tận tâm, Nhân Tâm luôn đặt lợi
                ích của bệnh nhân lên hàng đầu, đảm bảo chất lượng dịch vụ cao.
                Phòng khám trang bị thiết bị y tế hiện đại, đáp ứng tiêu chuẩn
                quốc tế, giúp chẩn đoán và điều trị chính xác. Hãy đến với Phòng
                Khám Nhân Tâm để trải nghiệm dịch vụ y tế tận tình và chuyên
                nghiệp!
              </p>
              <button className="appointment-btn">Đặt lịch ngay</button>
              <div className="text-stats">
                <div className="text-stats-container">
                  <p>145k+</p>
                  <p>Tiếp nhận bệnh nhân</p>
                </div>

                <div className="text-stats-container">
                  <p>50+</p>
                  <p>Bác sĩ chuyên gia</p>
                </div>

                <div className="text-stats-container">
                  <p>10+</p>
                  <p>Số năm kinh nghiệm</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} className="banner-image">
            <div className="doctor-image">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#6EC2F7"
                  d="M47.5,-57.2C59.5,-47.4,66.1,-30.9,68.4,-13.9C70.7,3.1,68.7,20.7,60.8,35.3C52.9,49.9,39.1,61.5,23,67.1C6.9,72.7,-11.5,72.2,-27.4,65.9C-43.3,59.5,-56.6,47.2,-65.1,31.6C-73.6,16,-77.2,-2.9,-71.9,-18.1C-66.5,-33.3,-52.2,-44.7,-37.8,-53.8C-23.4,-62.9,-8.9,-69.7,4.9,-75.3C18.7,-80.9,35.5,-67,47.5,-57.2Z"
                  transform="translate(100 100)"
                />
              </svg>
              <img
                src="/images/slide.png"
                alt="Doctor illustration"
                className="doctor-illustration"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;

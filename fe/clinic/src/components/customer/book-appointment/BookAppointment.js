import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import "./BookAppointment.css";

function BookAppointment() {
  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img
          src="/images/doctor-book-appointment.png"
          alt="Doctor appointment"
          className="doctor-appointment"
        />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>Tại sao chọn Sức khỏe</span>
        </h3>
        <p className="ba-description">
          Khám phá lý do để chọn Health Plus cho nhu cầu chăm sóc sức khỏe của
          bạn. Trải nghiệm dịch vụ chăm sóc chuyên nghiệp, tiện lợi và các giải
          pháp được cá nhân hóa, coi sức khỏe của bạn là ưu tiên hàng đầu của
          chúng tôi. Hãy tham gia cùng chúng tôi trên hành trình hướng đến sức
          khỏe tốt hơn và cuộc sống hạnh phúc hơn.
        </p>

        <p className="ba-checks ba-check-first">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Bác sĩ chuyên nghiệp tốt nhất
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Chăm sóc khẩn cấp
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Hỗ trợ 24/7 Trò chuyện trực tiếp
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} />{" "}
          Đăng ký dễ dàng và nhanh chóng
        </p>
      </div>
    </div>
  );
}

export default BookAppointment;

import React from "react";
import "./About.css";
import SolutionStep from "../solutionStep/SolutionStep";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img
          src="/images/Doctor.png"
          alt="Doctor Group"
          className="Doctor-group"
        />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>Về chúng tôi</span>
        </h3>
        <p className="about-description">
          Chào mừng đến với Health Plus, đối tác đáng tin cậy của bạn về dịch vụ
          chăm sóc sức khỏe dễ tiếp cận và được cá nhân hóa. Các bác sĩ chuyên
          gia của chúng tôi cung cấp dịch vụ tư vấn trực tuyến và các dịch vụ
          chuyên khoa, ưu tiên sức khỏe của bạn. Hãy tham gia cùng chúng tôi
          trên hành trình hướng đến một bạn khỏe mạnh hơn.
        </p>

        <h4 className="about-text-title">Giải pháp của bạn</h4>

        <SolutionStep
          title="Chọn một chuyên gia"
          description="Tìm chuyên gia lý tưởng của bạn và đặt lịch dễ dàng tại Health Plus. Các bác sĩ chuyên khoa ưu tiên sức khỏe của bạn, cung cấp dịch vụ chăm sóc phù hợp."
        />

        <SolutionStep
          title="Tạo một lịch trình"
          description="Hãy chọn ngày và giờ phù hợp nhất với bạn và để đội ngũ chuyên gia y tế tận tâm của chúng tôi đảm bảo sức khỏe của bạn bằng dịch vụ chăm sóc cá nhân."
        />

        <SolutionStep
          title="Nhận giải pháp của bạn"
          description="Các bác sĩ và chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn sàng tư vấn chuyên môn và đưa ra kế hoạch điều trị cá nhân, giúp bạn đạt được sức khỏe tốt nhất có thể."
        />
      </div>
    </div>
  );
}

export default About;

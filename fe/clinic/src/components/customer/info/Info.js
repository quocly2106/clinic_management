import React from "react";
import InformationCard from "./InformationCard";
import {
  faHeartPulse,
  faTruckMedical,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";
import "./Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Chúng tôi làm gì</span>
        </h3>
        <p className="info-description">
          Chúng tôi mang dịch vụ chăm sóc sức khỏe đến tận nơi thuận tiện cho
          bạn, cung cấp một loạt các dịch vụ y tế theo yêu cầu toàn diện phù hợp
          với nhu cầu của bạn. Nền tảng của chúng tôi cho phép bạn kết nối với
          các bác sĩ trực tuyến giàu kinh nghiệm, những người cung cấp lời
          khuyên y tế chuyên môn, kê đơn trực tuyến và cung cấp dịch vụ nạp
          thuốc nhanh bất cứ khi nào bạn cần.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Chăm sóc khẩn cấp"
          description="Dịch vụ chăm sóc khẩn cấp của chúng tôi được thiết kế để trở thành sự hỗ trợ đáng tin cậy của bạn
                        trong những tình huống nguy cấp. Cho dù đó là bệnh tật đột ngột, chấn thương hoặc
                        bất kỳ vấn đề y tế nào cần được chăm sóc ngay lập tức, nhóm
                        chuyên gia chăm sóc sức khỏe tận tâm của chúng tôi luôn sẵn sàng 24/7 để cung cấp
                        dịch vụ chăm sóc nhanh chóng và hiệu quả."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Bệnh tim"
          description="Đội ngũ bác sĩ tim mạch và chuyên gia y tế giàu kinh nghiệm của chúng tôi sử dụng
                        công nghệ tiên tiến để đánh giá sức khỏe tim mạch của bạn và
                        thiết kế các kế hoạch điều trị được cá nhân hóa. Từ các cuộc kiểm tra toàn diện
                        đến các can thiệp tiên tiến, chúng tôi cam kết giúp bạn duy trì
                        một trái tim khỏe mạnh và có một cuộc sống trọn vẹn."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Chăm sóc răng miệng"
          description="Hãy tự tin mỉm cười vì dịch vụ Chăm sóc răng miệng của chúng tôi đáp ứng mọi nhu 
                        cầu về sức khỏe răng miệng của bạn. Các nha sĩ lành nghề của chúng tôi cung cấp nhiều loại
                        phương pháp điều trị, từ kiểm tra và vệ sinh răng miệng định kỳ đến các thủ thuật thẩm mỹ 
                        và phục hồi."
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;

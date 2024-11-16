import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Row, Col, Container, Pagination } from "react-bootstrap";
import { allDoctorsOfSpecialties } from "../../utils/ApiFunction"; // API lấy danh sách bác sĩ
import { allSpecialties } from "../../utils/ApiFunction"; // API lấy danh sách chuyên khoa
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]); // Initialize as empty array
  const [specialties, setSpecialties] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { specialtyId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage, setDoctorsPerPage] = useState(3); // Tối đa 3 bác sĩ mỗi trang

  // Hàm lấy danh sách bác sĩ và chuyên khoa
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách chuyên khoa
        const specialtiesData = await allSpecialties();
        setSpecialties(specialtiesData);

        // Lấy danh sách bác sĩ cho chuyên khoa hiện tại
        const doctorsData = await allDoctorsOfSpecialties(specialtyId);
        setDoctors(doctorsData);
      } catch (err) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [specialtyId]);

  // Tính toán các bác sĩ hiện tại trên trang
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải danh sách bác sĩ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="doctors-container">
      <h2 className="text-center mb-4">Danh sách bác sĩ</h2>
      <div className="doctors-list">
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doctor) => {
            const specialtyName =
              specialties.find((spec) => spec.id === doctor.specialtyId)
                ?.name || "N/A";
            return (
              <div key={doctor.id} className="doctor-item">
                <Row className="align-items-center">
                  <Col md={4} className="doctor-image-col">
                    <div className="doctor-image-wrapper">
                      <img
                        src={`http://localhost:9191/img/${doctor.image}`}
                        alt={doctor.name}
                        onError={(e) => {
                          e.target.src = "/default-doctor.png";
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={8} className="doctor-info-col">
                    <div className="doctor-details">
                      <h3 className="doctor-name">
                        {doctor.firstName} {doctor.lastName}
                      </h3>
                      <p className="doctor-specialty">
                        <strong>Chuyên khoa:</strong> {specialtyName}
                      </p>
                      <p className="doctor-experience">
                        <strong>Kinh nghiệm:</strong>{" "}
                        {doctor.experience || "Chưa có thông tin"}
                      </p>
                      <p className="doctor-description">
                        <strong>Mô tả:</strong>{" "}
                        {doctor.description || "Chưa có mô tả"}
                      </p>
                      <div className="doctor-actions">
                        <button className="book-appointment-btn">
                          Đặt lịch khám
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })
        ) : (
          <div className="no-doctors">
            <p>Không tìm thấy bác sĩ cho chuyên khoa này</p>
          </div>
        )}
      </div>

      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Pagination>
            <Pagination.First
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(doctors.length / doctorsPerPage))].map(
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(doctors.length / doctorsPerPage)}
            />
            <Pagination.Last
              onClick={() => paginate(Math.ceil(doctors.length / doctorsPerPage))}
              disabled={currentPage === Math.ceil(doctors.length / doctorsPerPage)}
            />
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default Doctors;

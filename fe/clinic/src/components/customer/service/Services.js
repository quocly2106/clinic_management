import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import { allServices } from "../../utils/ApiFunction";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(6); // Mặc định 6 dịch vụ mỗi trang

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setServicesPerPage(4); // Khi màn hình nhỏ hơn hoặc bằng 768px, hiển thị tối đa 4 dịch vụ mỗi trang
      } else {
        setServicesPerPage(6); // Khi màn hình lớn hơn 768px, hiển thị tối đa 6 dịch vụ mỗi trang
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi ngay để xử lý khi tải trang lần đầu tiên

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await allServices();
      setServices(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchServices}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="services-page">
      <section className="services-list">
        <div className="container">
          <Row className="row-service justify-content-center">
            {currentServices.map((service, index) => (
              <Col key={service.id} xs={6} sm={6} md={4} lg={4} className="col-service">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="service-card">
                    <div className="image-border">
                      {service.image && (
                        <Card.Img
                          variant="top"
                          src={`http://localhost:9191/img/${service.image}`}
                          alt={service.name}
                          className="service-image"
                        />
                      )}
                    </div>
                    <div className="card-body">
                      <Card.Title>{service.name}</Card.Title>
                      <Card.Text>{service.description}</Card.Text>
                      <div className="service-details">
                        {service.price && (
                          <div className="service-price">
                            Giá:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(service.price)}
                          </div>
                        )}
                        {service.duration && (
                          <div className="service-duration">
                            Thời gian: {service.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <Pagination>
                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                
                {[...Array(Math.ceil(services.length / servicesPerPage))].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(services.length / servicesPerPage)}
                />
                <Pagination.Last
                  onClick={() => paginate(Math.ceil(services.length / servicesPerPage))}
                  disabled={currentPage === Math.ceil(services.length / servicesPerPage)}
                />
              </Pagination>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}

export default Services;

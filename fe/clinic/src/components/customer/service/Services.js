import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { allServices } from '../../utils/ApiFunction';
import './Services.css';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await allServices();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

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
      {/* Services List Section */}
      <section className="services-list">
        <Container>
          <Row>
            {services.map((service, index) => (
              <Col key={service.id} lg={6} md={6} sm={12}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="service-card">
                    {service.image && (
                      <Card.Img 
                        variant="top" 
                        src={service.image} 
                        alt={service.name}
                        className="service-image" 
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{service.name}</Card.Title>
                      <Card.Text>{service.description}</Card.Text>
                      <div className="service-details">
                        {service.price && (
                          <div className="service-price">
                            Giá: {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(service.price)}
                          </div>
                        )}
                        {service.duration && (
                          <div className="service-duration">
                            Thời gian: {service.duration}
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Services;
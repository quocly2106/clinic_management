import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { allSpecialties } from "../../utils/ApiFunction";
import "./Specialties.css";

function Specialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const data = await allSpecialties();
      setSpecialties(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.");
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
        <button className="retry-button" onClick={fetchSpecialties}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="specialties-page">
      <section className="specialties-list">
        <Container>
          <Row className="row-specialty">
            {specialties.map((specialty, index) => (
              <Col key={specialty.id} className="col-specialty">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="specialty-card">
                    <Row>
                      <Col className="image-border">
                        {specialty.image && (
                          <Card.Img
                            variant="top"
                            src={`http://localhost:9191/img/${specialty.image}`}
                            alt={specialty.name}
                            className="specialty-image"
                          />
                        )}
                      </Col>
                      <Col className="card-body">
                        <Card.Title>{specialty.name}</Card.Title>
                        <Card.Text>{specialty.description}</Card.Text>
                      </Col>
                    </Row>
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

export default Specialties;

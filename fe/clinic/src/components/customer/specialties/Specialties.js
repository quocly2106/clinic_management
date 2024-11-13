import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import { allSpecialties } from "../../utils/ApiFunction";
import "./Specialties.css";

function Specialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [specialtiesPerPage, setSpecialtiesPerPage] = useState(9);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  useEffect(() => {
    // Cập nhật số lượng chuyên khoa mỗi trang khi màn hình thay đổi kích thước
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSpecialtiesPerPage(6);
      } else {
        setSpecialtiesPerPage(9);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi ngay lập tức để xử lý khi trang đã tải

    return () => window.removeEventListener("resize", handleResize);
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

  const indexOfLastSpecialty = currentPage * specialtiesPerPage;
  const indexOfFirstSpecialty = indexOfLastSpecialty - specialtiesPerPage;
  const currentSpecialty = specialties.slice(indexOfFirstSpecialty, indexOfLastSpecialty);

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
        <button className="retry-button" onClick={fetchSpecialties}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="specialties-page">
      <section className="specialties-list">
        <div className="container">
          <Row className="row-specialty justify-content-center">
            {currentSpecialty.map((specialty, index) => (
              <Col key={specialty.id} md={6} lg={4} className="col-specialty">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="specialty-card">
                    <div className="image-border">
                      {specialty.image && (
                        <Card.Img
                          variant="top"
                          src={`http://localhost:9191/img/${specialty.image}`}
                          alt={specialty.name}
                          className="specialty-image"
                        />
                      )}
                    </div>
                    <div className="card-body">
                      <Card.Title>{specialty.name}</Card.Title>
                      <Card.Text>{specialty.description}</Card.Text>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
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
                
                {[...Array(Math.ceil(specialties.length / specialtiesPerPage))].map((_, index) => (
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
                  disabled={currentPage === Math.ceil(specialties.length / specialtiesPerPage)}
                />
                <Pagination.Last
                  onClick={() => paginate(Math.ceil(specialties.length / specialtiesPerPage))}
                  disabled={currentPage === Math.ceil(specialties.length / specialtiesPerPage)}
                />
              </Pagination>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}

export default Specialties;

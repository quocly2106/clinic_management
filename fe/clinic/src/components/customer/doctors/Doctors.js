import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { allDoctorsOfSpecialties } from '../../utils/ApiFunction'; // Đảm bảo đường dẫn đúng
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { specialtyId } = useParams();

  useEffect(() => {
    fetchDoctors();
  }, [specialtyId]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await allDoctorsOfSpecialties(specialtyId);
      setDoctors(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

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
        <button className="retry-button" onClick={fetchDoctors}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="doctors-container">
      <div className="doctors-section">
        <h2>Danh sách bác sĩ</h2>
        <div className="doctors-grid">
          {doctors.length > 0 ? (
            doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image">
                  <img 
                    src={`http://localhost:9191/img/${doctor.image}`} 
                    alt={doctor.name} 
                    onError={(e) => {
                      e.target.src = '/default-doctor.png'; // Hình mặc định nếu load ảnh lỗi
                    }}
                  />
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty?.name}</p>
                  <p className="experience">{doctor.experience}</p>
                  <p className="description">{doctor.description}</p>
                  <button className="book-appointment">Đặt lịch khám</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-doctors">
              <p>Không tìm thấy bác sĩ cho chuyên khoa này</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
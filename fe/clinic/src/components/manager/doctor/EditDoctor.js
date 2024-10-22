import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditDoctor = () => {
  const { doctorId } = useParams(); // Lấy doctorId từ URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]); // Thêm state để lưu danh sách chuyên khoa
  const [selectedSpecialty, setSelectedSpecialty] = useState(''); // State để lưu chuyên khoa đã chọn

  useEffect(() => {
    const fetchDoctorById = async (id) => {
      try {
        const token = localStorage.getItem('token'); // Giả sử bạn lưu token trong local storage
        const response = await fetch(`http://localhost:9191/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch doctor');
        }
        const data = await response.json();
        setDoctor(data);
        setSelectedSpecialty(data.specialtyId); // Thiết lập specialtyId từ bác sĩ
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSpecialties = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        const response = await fetch(`http://localhost:9191/specialties/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch specialties');
        }
        const data = await response.json();
        setSpecialties(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDoctorById(doctorId);
    fetchSpecialties(); // Gọi API để lấy danh sách chuyên khoa
  }, [doctorId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      const response = await fetch(`http://localhost:9191/doctors/update/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...doctor, specialtyId: selectedSpecialty }), // Gửi specialtyId
      });
      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }
      // Xử lý thành công
      alert('Doctor updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!doctor) {
    return <p>No doctor found</p>;
  }

  return (
    <div>
      <h2>Edit Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="text" value={doctor.email || ''} readOnly />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={doctor.firstName || ''}
            onChange={(e) => setDoctor({ ...doctor, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={doctor.lastName || ''}
            onChange={(e) => setDoctor({ ...doctor, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Specialty:</label>
          <select
            value={selectedSpecialty || ''}
            onChange={(e) => setSelectedSpecialty(e.target.value)} // Cập nhật specialtyId
          >
            <option value="">Select Specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name} {/* Hiển thị tên chuyên khoa */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Role:</label>
          <input type="text" value={doctor.role || ''} readOnly />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditDoctor;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AppointmentForm.css";
import {
  allSpecialties,
  allDoctorsOfSpecialties,
  bookAppointment,
} from "../../utils/ApiFunction";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    doctorId: "",
    specialtyId: "",
    patient: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "default",
      dateOfBirth: "",
      phone: "",
    },
    dateTime: "",
    reason: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch specialties on component mount
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await allSpecialties();
        setSpecialties(data);
      } catch (error) {
        toast.error("Failed to load specialties.");
      }
    };

    fetchSpecialties();
  }, []);

  // Handle change of selected specialty
  const handleSpecializationChange = async (e) => {
    const specialtyId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      specialtyId,
      doctorId: "",
    }));

    if (specialtyId) {
      try {
        const data = await allDoctorsOfSpecialties(specialtyId);
        setDoctors(data);
      } catch (error) {
        setDoctors([]);
        toast.error("Failed to load doctors.");
      }
    } else {
      setDoctors([]);
    }
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("patient.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        patient: {
          ...prev.patient,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const { patient, dateTime, specialtyId, doctorId, reason } = formData;
    const currentDate = new Date();

    //validate email
    if (!patient.email.endsWith("@gmail.com")) {
      errors.email = "Email phải có @gmail.com";
    }
    // Validate phone number
    if (!/^\d{10}$/.test(patient.phone)) {
      errors.phone = "Số điện thoại phải có đúng 10 chữ số";
    }

    // Validate appointment datetime
    const appointmentDate = new Date(dateTime);
    if (appointmentDate <= currentDate) {
      errors.dateTime = "Thời gian hẹn phải sau thời điểm hiện tại";
    }

    // Check if time is between 8 AM and 5 PM
    const appointmentHour = appointmentDate.getHours();
    if (appointmentHour < 8 || appointmentHour >= 17) {
      errors.dateTime = "Thời gian hẹn phải nằm trong khoảng từ 8h đến 17h";
    }

    // Validate date of birth
    const birthDate = new Date(patient.dateOfBirth);
    if (birthDate >= currentDate) {
      errors.dateOfBirth = "Ngày sinh phải là ngày trong quá khứ";
    }

    // Validate required fields
    if (!specialtyId) {
      errors.specialtyId = "Vui lòng chọn chuyên khoa";
    }
    if (!doctorId) {
      errors.doctorId = "Vui lòng chọn bác sĩ";
    }
    if (!patient.firstName.trim()) {
      errors.firstName = "Vui lòng nhập họ";
    }
    if (!patient.lastName.trim()) {
      errors.lastName = "Vui lòng nhập tên";
    }
    if (!patient.email.trim()) {
      errors.email = "Vui lòng Email";
    }
    if (patient.gender === "default") {
      errors.gender = "Vui lòng chọn giới tính";
    }
    if (!reason.trim()) {
      errors.reason = "Vui lòng nhập lý do khám";
    }
    

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // Nếu có lỗi, không gửi dữ liệu và hiển thị thông báo lỗi
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const selectedDoctor = doctors.find(
        (doc) => doc.email === formData.doctorId
      );
      const selectedSpecialty = specialties.find(
        (spec) => spec.id === Number(formData.specialtyId)
      );

      if (!selectedDoctor || !selectedSpecialty) {
        toast.error("Không tìm thấy bác sĩ hoặc chuyên khoa", {
          position: "top-center",
        });
        setIsLoading(false);
        return;
      }

      const appointmentData = {
        specialtyName: selectedSpecialty.name,
        doctorFirstName: selectedDoctor.firstName,
        doctorLastName: selectedDoctor.lastName,
        doctorId: selectedDoctor.email, // Sử dụng email làm doctorId
        specialtyId: selectedSpecialty.id,
        patient: formData.patient,
        dateTime: formData.dateTime,
        reason: formData.reason,
      };

      const response = await bookAppointment(appointmentData);

      // Rest of the code remains the same
      if (response.success) {
        toast.success("Đặt lịch thành công!", {
          position: "top-center",
          onOpen: () => setIsSubmitted(true),
          onClose: () => setIsSubmitted(false),
        });

        setFormData({
          doctorId: "",
          specialtyId: "",
          patient: {
            firstName: "",
            lastName: "",
            email:"",
            gender: "default",
            dateOfBirth: "",
            phone: "",
          },
          dateTime: "",
          reason: "",
        });
        setFormErrors({});
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.message || "Không thể đặt lịch", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      toast.error("Đặt lịch không thành công. Vui lòng thử lại.", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { doctorId, specialtyId, patient, dateTime, reason } = formData;

  return (
    <div className="appointment-form-section">
      <div className="form-container">
        <h2 className="form-title">
          <span>Đặt lịch</span>
        </h2>
        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Chuyên khoa:
            <select
              name="specialtyId"
              value={specialtyId}
              onChange={handleSpecializationChange}
              required
            >
              <option value="">Chọn chuyên khoa</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
            {formErrors.specialtyId && (
              <p className="error-message">{formErrors.specialtyId}</p>
            )}
          </label>
          <label>
            Bác sĩ:
            <select
              name="doctorId"
              value={doctorId}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn bác sĩ</option>
              {doctors.map((doctor) => (
                <option key={doctor.email} value={doctor.email}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </select>
            {formErrors.doctorId && (
              <p className="error-message">{formErrors.doctorId}</p>
            )}
          </label>

          <label>
            Họ:
            <input
              type="text"
              name="patient.firstName"
              value={patient.firstName}
              onChange={handleInputChange}
              required
            />
            {formErrors.firstName && (
              <p className="error-message">{formErrors.firstName}</p>
            )}
          </label>

          <label>
            Tên:
            <input
              type="text"
              name="patient.lastName"
              value={patient.lastName}
              onChange={handleInputChange}
              required
            />
            {formErrors.lastName && (
              <p className="error-message">{formErrors.lastName}</p>
            )}
          </label>
          <label>
            Email:
            <input
              type="text"
              name="patient.email"
              value={patient.email}
              onChange={handleInputChange}
              required
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </label>

          <label>
            Giới tính:
            <select
              name="patient.gender"
              value={patient.gender}
              onChange={handleInputChange}
              required
            >
              <option value="default">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
            {formErrors.gender && (
              <p className="error-message">{formErrors.gender}</p>
            )}
          </label>

          <label>
            Ngày sinh:
            <input
              type="date"
              name="patient.dateOfBirth"
              value={patient.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            {formErrors.dateOfBirth && (
              <p className="error-message">{formErrors.dateOfBirth}</p>
            )}
          </label>

          <label>
            Số điện thoại:
            <input
              type="text"
              name="patient.phone"
              value={patient.phone}
              onChange={handleInputChange}
              required
            />
            {formErrors.phone && (
              <p className="error-message">{formErrors.phone}</p>
            )}
          </label>

          <label>
            Thời gian hẹn:
            <input
              type="datetime-local"
              name="dateTime"
              value={dateTime}
              onChange={handleInputChange}
              required
            />
            {formErrors.dateTime && (
              <p className="error-message">{formErrors.dateTime}</p>
            )}
          </label>

          <label>
            Lý do khám:
            <textarea
              name="reason"
              value={reason}
              onChange={handleInputChange}
              required
            />
            {formErrors.reason && (
              <p className="error-message">{formErrors.reason}</p>
            )}
          </label>

          <div className="form-action">
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Đặt lịch"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AppointmentForm;

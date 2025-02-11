import axios from "axios";

// Tạo instance axios với base URL
export const api = axios.create({
  baseURL: "http://localhost:9191",
});

// Thêm interceptor để tự động gửi token nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Hàm đăng ký

export async function register(data) {
  try {
    const response = await api.post("/admin/register", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi trong quá trình đăng ký:", error);
    throw error;
  }
}

// Hàm đăng nhập
export async function login(data) {
  try {
    const response = await api.post("/auth/login", data);
    return response.data; // Trả về dữ liệu
  } catch (error) {
    console.error("Error during login:", error); // Log lỗi nếu có
    if (error.response && error.response.status === 401) {
      throw new Error("Email hoặc mật khẩu không hợp lệ");
    } else {
      throw new Error("Đăng nhập không thành công, vui lòng thử lại");
    }
  }
}
// Profile
export const getDoctorProfile = async (doctorId) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const response = await axios.get(
    `http://localhost:9191/doctors/${doctorId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    }
  );
  return response.data;
};

export const getReceptionistProfile = async (receptionistId) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const response = await axios.get(
    `http://localhost:9191/receptionists/${receptionistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    }
  );
  return response.data;
};

export const getAdminProfile = async (adminId) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const response = await axios.get(`http://localhost:9191/admin/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });
  return response.data;
};

// đổi password
export const changeAdminPassword = async (adminId, data) => {
  try {
    const response = await api.put(`/admin/${adminId}/change-password`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi đổi mật khẩu Admin:", error);
    throw error;
  }
};

export const changeDoctorPassword = async (doctorId, data) => {
  try {
    const response = await api.put(
      `/doctors/${doctorId}/change-password`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu bác sĩ:", error.response);
    throw error;
  }
};

export const changeReceptionistPassword = async (receptionistId, data) => {
  try {
    const response = await api.put(
      `/receptionists/${receptionistId}/change-password`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu lễ tân:", error.response);
    throw error;
  }
};

// doctor
export const allDoctors = async () => {
  try {
    const response = await api.get("/doctors/all"); // Sử dụng api instance
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả bác sĩ:", error); // Log lỗi nếu có
    throw error;
  }
};

export const addDoctor = async (doctorDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("doctorDto", new Blob([JSON.stringify(doctorDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      "http://localhost:9191/doctors/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm bác sĩ:", error);
    throw error;
  }
};


export const editDoctor = async (doctorId, doctorDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("doctorDto", new Blob([JSON.stringify(doctorDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `http://localhost:9191/doctors/update/${doctorId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa bác sĩ:", error);
    throw error;
  }
};

export async function deleteDoctor(doctorId) {
  try {
    const result = await api.delete(`/doctors/delete/${doctorId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Lỗi khi xoá bác sĩ" ${error.message}`);
  }
}


// receptionist

export const allReceptionists = async () => {
  try {
    const response = await api.get("/receptionists/all"); // Sử dụng api instance
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả lễ tân:", error); // Log lỗi nếu có
    throw error;
  }
};

export const addReceptionist = async (receptionistDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("receptionistDto", new Blob([JSON.stringify(receptionistDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      "http://localhost:9191/receptionists/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm lễ tân", error);
    throw error;
  }
};

export const editReceptionist = async (receptionistId, receptionistDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("receptionistDto", new Blob([JSON.stringify(receptionistDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `http://localhost:9191/receptionists/update/${receptionistId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa lễ tân:", error);
    throw error;
  }
};

export async function deleteReceptionist(receptionistId) {
  try {
    const result = await api.delete(`/receptionists/delete/${receptionistId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Lỗi khi xoá lễ tân" ${error.message}`);
  }
}

//admin
export const allAdmins = async () => {
  try {
    const response = await api.get("/admin/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả admin:", error);
    throw error;
  }
};

// specialty
export const allSpecialties = async () => {
  try {
    const response = await api.get("/specialties/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả chuyên khoa:", error);
    throw error;
  }
};

export const addSpecialty = async (specialtyDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("specialtyDto", new Blob([JSON.stringify(specialtyDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      "http://localhost:9191/specialties/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm chuyên khoa:", error);
    throw error;
  }
};


export const editSpecialty = async (specialtyId, specialtyDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("specialtyDto", new Blob([JSON.stringify(specialtyDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `http://localhost:9191/specialties/update/${specialtyId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa chuyên khoa:", error);
    throw error;
  }
};


export async function deleteSpecialty(specialtyId) {
  try {
    const result = await api.delete(`/specialties/delete/${specialtyId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Lỗi khi xoá chuyên khoa" ${error.message}`);
  }
}

export const allDoctorsOfSpecialties = async (specialtyId) => {
  try {
    const response = await api.get(`/specialties/${specialtyId}/doctors`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả bác sĩ của chuyên khoa:", error);
    throw error;
  }
};

// service
export const allServices = async () => {
  try {
    const response = await api.get("/services/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả các dịch vụ:", error);
    throw error;
  }
};

export const addService = async (serviceDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("serviceDto", new Blob([JSON.stringify(serviceDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      "http://localhost:9191/services/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm dịch vụ:", error);
    throw error;
  }
};

export const editService = async (serviceId, serviceDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("serviceDto", new Blob([JSON.stringify(serviceDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `http://localhost:9191/services/update/${serviceId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa dịch vụ:", error);
    throw error;
  }
};

export async function deleteService(serviceId) {
  try {
    const result = await api.delete(`/services/delete/${serviceId}`);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi xoá dịch vụ",
    };
  }
}

// medicine
export const allMedicines = async () => {
  try {
    const response = await api.get("/medicines/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả thuốc:", error);
    throw error;
  }
};

export const addMedicine = async (medicineDto,imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("medicineDto", new Blob([JSON.stringify(medicineDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(
      "http://localhost:9191/medicines/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm thuốc:", error);
    throw error;
  }
};


export const editMedicine = async (medicineId, medicineDto,imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("medicineDto", new Blob([JSON.stringify(medicineDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `http://localhost:9191/medicines/update/${medicineId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa thuốc:", error);
    throw error;
  }
};


export async function deleteMedicine(medicineId) {
  try {
    const result = await api.delete(`/medicines/delete/${medicineId}`);
    // Trả về toàn bộ response.data thay vì throw error
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi xoá thuốc",
    };
  }
}

// patient
export const allPatients = async () => {
  try {
    const response = await api.get("/patients/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả bệnh nhân:", error);
    throw error;
  }
};

export const addPatient = async (data) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    const response = await axios.post(
      "http://localhost:9191/patients/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm bệnh nhân:", error);
    throw error;
  }
};

export const editPatient = async (patientId, data) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    const response = await axios.put(
      `http://localhost:9191/patients/update/${patientId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa bệnh nhân:", error);
    throw error;
  }
};

export async function deletePatient(patientId) {
  try {
    const result = await api.delete(`/patients/delete/${patientId}`);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi xoá bệnh nhân",
    };
  }
}

// appointment
export const allAppointments = async () => {
  try {
    const response = await api.get("/appointments/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả lịch hẹn:", error);
    throw error;
  }
};

export const addAppointment = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:9191/appointments/add", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào Authorization
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm lịch hẹn:", error);
    throw error;
  }
};

export const editAppointment = async (appointmentId, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:9191/appointments/update/${appointmentId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa lịch hẹn:", error);
    throw error;
  }
};

export async function deleteAppointment(appointmentId) {
  try {
    const result = await api.delete(`/appointments/delete/${appointmentId}`);
    // Trả về toàn bộ response.data thay vì throw error
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi xoá lịch hẹn",
    };
  }
}

export async function bookAppointment(data) {
  try {
    console.log("Data being sent to API:", data);
    const result = await api.post("/appointments/book-appointment", data);
    console.log("API Response:", data);
    return {
      success: true,
      data: result.data,
      message: "Lịch hẹn đã được đặt thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Thời gian này của bác sĩ đã có người đặt , vui lòng đặt thời gian khác",
    };
  }
}



// news
export const allNews = async () => {
  try {
    const response = await api.get("/news/all");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm tất cả tin tức:", error);
    throw error;
  }
};

export const addNews = async (newsDto,imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("newsDto", new Blob([JSON.stringify(newsDto)], {
      type: "application/json"
    }));

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    const response = await axios.post(
      "http://localhost:9191/news/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const editNews = async (newsId, newsDto, imageFile) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("newsDto", new Blob([JSON.stringify(newsDto)], {
      type: "application/json"
    }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `http://localhost:9191/news/update/${newsId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa tin tức:", error);
    throw error;
  }
};


export async function deleteNews(newsId) {
  try {
    const result = await api.delete(`/news/delete/${newsId}`);
    // Trả về toàn bộ response.data thay vì throw error
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi xoá tin tức",
    };
  }
}

export async function getNewsById(newsId) {
  try {
    const result = await api.get(`/news/${newsId}`);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi khi tìm tin tức",
    };
  }
}


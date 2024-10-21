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


// Hàm đăng nhập
export async function login(data) {
  try {
    const response = await api.post("/auth/login", data); 
    return response.data; // Trả về dữ liệu
  } catch (error) {
    console.error("Error during login:", error); // Log lỗi nếu có
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email or password");
    } else {
      throw new Error("Login failed, please try again");
    }
  }
}

// Lấy profile bác sĩ
export const getDoctorProfile = async (doctorId) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  const response = await axios.get(`http://localhost:9191/doctors/${doctorId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });
  return response.data;
};

// Lấy profile lễ tân
export const getReceptionistProfile = async (receptionistId) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  const response = await axios.get(`http://localhost:9191/receptionists/${receptionistId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });
  return response.data;
};

// Lấy profile admin
export const getAdminProfile = async (adminId) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  const response = await axios.get(`http://localhost:9191/admin/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });
  return response.data;
};

// đổi password admin
export const changeAdminPassword = async (adminId, data) => {
  try {
    const response = await api.put(`/admin/${adminId}/change-password`, data);
    return response.data;
  } catch (error) {
    console.error("Error changing admin password:", error);
    throw error;
  }
};

// đổi password doctor
export const changeDoctorPassword = async (doctorId, data) => {
  try {
    const response = await api.put(`/doctors/${doctorId}/change-password`, data);
    return response.data;
  } catch (error) {
    console.error("Error during doctor password change:", error.response);
    throw error;
  }
};

// đổi password receptionist
export const changeReceptionistPassword = async (receptionistId, data) => {
  try {
    const response = await api.put(`/receptionists/${receptionistId}/change-password`, data);
    return response.data;
  } catch (error) {
    console.error("Error during receptionist password change:", error.response);
    throw error;
  }
};

export const allDoctors = async () => {
  try {
    const response = await api.get('/doctors/all'); // Sử dụng api instance
    return response.data;
  } catch (error) {
    console.error("Error fetching all doctors:", error); // Log lỗi nếu có
    throw error;
  }
};

export const addDoctor = async (data) => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    console.log("Token:", token);
    const response = await axios.post('http://localhost:9191/doctors/add', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error add doctor:", error);
    throw error;
  }
};

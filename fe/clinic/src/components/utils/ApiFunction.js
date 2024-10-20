import axios from "axios";

// Tạo instance axios với base URL
export const api = axios.create({
  baseURL: "http://localhost:9191",
});

// Thêm interceptor để tự động gửi token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Gửi token trong headers
  }
  return config;
});

// Hàm đăng nhập
export async function login(data) {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email or password");
    } else {
      throw new Error("Login failed, please try again");
    }
  }
}

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9191",
});

export async function login(Data) {
    try {
      const response = await api.post("/auth/login",Data); 
      return response.data;
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("Login failed, please try again");
      }
    }
  }

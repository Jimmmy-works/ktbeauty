import { BASE_URL } from "@/contants/environment";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import authService from "@/service/authService";
import axios from "axios";
import { decodeToken } from "react-jwt";
// Tạo một instanceAxios của Axios
const instanceAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// instanceAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     // Tra ve data error => lay error.config de cau hinh
//     console.log("error", error);
//     const originalRequest = error.config;
//     // Nếu mã lỗi là 401 hoặc 403
//     const _refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshToken);
//     const _access_token = localStorage.getItem(LOCAL_STORAGE.token);
//     if (error.response.status === 403 || error.response.status === 401) {
//       try {
//         // Gọi API để cập nhật token mới
//         const result = await authService.refreshToken(_refreshToken);
//         if (!_access_token) throw new Error();
//         localStorage.setItem(LOCAL_STORAGE.token, _access_token);
//         // // Thay đổi token trong header của yêu cầu ban đầu
//         originalRequest.headers["token"] = `Bearer ${_access_token}`;
//         // originalRequest.headers["token"] = `Bearer ${result.data.access_token}`;
//         // // Gọi lại yêu cầu ban đầu với token mới
//         return instanceAxios(originalRequest);
//       } catch (error) {
//         console.log(error);
//         // Xử lý lỗi nếu không thể cập nhật token mới
//         // Ví dụ: chuyển hướng người dùng đến trang login
//         // message.error("Lỗi quyền truy cập, xin vui lòng đăng nhập lại");
//       }
//     }
//     // Nếu lỗi không phải là 401 hoặc 403, trả về lỗi ban đầu
//     return Promise.reject(error);
//     // return Promise.reject(error?.response?.data);
//   }
// );
instanceAxios.interceptors.request.use(
  async (config) => {
    const _accessToken = localStorage.getItem(LOCAL_STORAGE.token);
    const _refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshToken);
    const decodeAccessToken = decodeToken(_accessToken);
    const currentTime = new Date().getTime();
    const now = Math.round(currentTime / 1000);
    if (decodeAccessToken?.exp < now && _accessToken && _refreshToken) {
      const res = await authService.refreshToken(_refreshToken);
      localStorage.setItem(LOCAL_STORAGE.token, res?.data?.data?.access_token);
      const newAccessToken = localStorage.getItem(LOCAL_STORAGE.token);
      config.headers["token"] = `Bearer ${newAccessToken}`;
    }
    return config;
  },
  (err) => {
    console.log("err", err);
    return Promise.reject(err);
  }
);

export default instanceAxios;
8;

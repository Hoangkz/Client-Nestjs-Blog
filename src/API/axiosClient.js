import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://shopdazielz-hoangkz.koyeb.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
  
//   (error) => {
//     const originalRequest = error.config;
//     const { status } = error.response;

//     // Nếu lỗi 401 và chưa gửi yêu cầu refresh token
//     if (status === 401 && !originalRequest._retry) {
//       toast.warning("Thời gian truy cập của bạn đã hết!")
//     }
//     return Promise.reject(error);
//   }
  
// );
export default axiosClient;

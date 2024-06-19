import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});
export const axiosHeader = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*"
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

export default axiosClient;

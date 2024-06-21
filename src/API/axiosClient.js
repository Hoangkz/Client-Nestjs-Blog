import axios from "axios";
import { toast } from "react-toastify";
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


axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 419) {
      try {
        console.log("call refresh token api")
        const url = "/auth/refresh-token"
        const data = {
          refresh_token: localStorage.getItem('token')
        }
        const result = await axiosClient.post(url, data)
        const { access_token } = result.data;
        localStorage.setItem('token', access_token)
        originalConfig.headers['Authorization'] = `Bearer ${access_token}`

      } catch (err) {
        toast.error("!erver error!")
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  })

export default axiosClient;

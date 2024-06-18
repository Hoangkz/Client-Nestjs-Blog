import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
  refresh_Token(refresh_token) {
    const url = "/auth/refresh-token";
    return axiosClient.post(url, refresh_token);
  },
  signup(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  }
};

export default authApi;

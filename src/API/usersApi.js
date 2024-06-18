import axiosClient from "./axiosClient";

const usersApi = {
  getUser(data) {
    const url = `/user/show-user`;
    return axiosClient.post(url,data);
  },
  updateUser(data) {
    const url = `/user/update`;
    return axiosClient.post(url,data);
  },
  changePassword(data) {
    const url = `/user/changePassword`;
    return axiosClient.post(url,data);
  },
  forgotpassword(data) {
    const url = `/user/forgotPassword`;
    return axiosClient.post(url,data);
  },
  listUser(data,page) {
    const url = `/user/show-list?page=${page}`;
    return axiosClient.post(url,data);
  },
  deleteUser(data) {
    const url = `/user/delete-user`;
    return axiosClient.post(url,data);
  },
};

export default usersApi;

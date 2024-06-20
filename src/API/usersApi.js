import axiosClient from "./axiosClient";

const usersApi = {

  getUser(data) {
    const url = `/users/show-user`;
    return axiosClient.post(url, data);
  },
  changePassword(data) {
    const url = `/users/changePassword`;
    return axiosClient.post(url, data);
  },
  forgotpassword(data) {
    const url = `/users/forgotPassword`;
    return axiosClient.post(url, data);
  },

  //#
  searchUser(data) {
    const url = `/users/search?q=${data}`;
    return axiosClient.get(url);
  },
  listAllUser(page, search) {
    const url = `/users/search?page=${page}&q=${search}`;
    return axiosClient.get(url);
  },
  getUserById(data) {
    const url = `/users/${data}`;
    return axiosClient.get(url, data);
  },
  createUser(data) {
    const url = `/users`;
    return axiosClient.put(url, data);
  },
  updateUser(data) {
    const { id, ...rest } = data
    const url = `/users/${id}`;
    return axiosClient.put(url, rest);
  },
  deleteUser(data) {
    const url = `/users/many`;
    return axiosClient.delete(url, {
      data: { data },
    });
  },
};

export default usersApi;

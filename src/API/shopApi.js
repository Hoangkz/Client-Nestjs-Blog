import axiosClient from "./axiosClient";
const shopApi = {
  // get Courses trending
  searchClient(query) {
    const url = `/items/searchClient?q=${query}`;
    return axiosClient.get(url);
  },
  search(query,page) {
    const url = `/items/search?q=${query}&page=${page}`;
    return axiosClient.get(url);
  },
  home(page){
    const url = `?page=${page}`;
    return axiosClient.get(url);
  },
  loaiItems(slug,page){
    const url = `/items/${slug}/show?page=${page}`;
    return axiosClient.get(url);
  },
  showItems(slug){
    const url = `/items/${slug}`;
    return axiosClient.get(url);
  },
  list_Items(data,page) {
    const url = `/items/list-items?page=${page}`;
    return axiosClient.post(url,data);
  },
  delete_Items(data) {
    const url = `/items/delete-items`;
    return axiosClient.post(url,data);
  },
  create_Items(data) {
    const url = `/items/create-items`;
    return axiosClient.post(url,data);
  },
  update_Items(data) {
    const url = `/items/update-items`;
    return axiosClient.post(url,data);
  },
};

export default shopApi;
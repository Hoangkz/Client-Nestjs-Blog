import axiosClient, { axiosHeader } from "./axiosClient";
const itemApi = {
  //category
  delete_Category(data) {
    const url = `/category/many`;
    return axiosClient.delete(url, {
      data: { data },
    });
  },
  create_Category(data) {
    const url = `/category`;
    return axiosHeader.post(url, data);
  },
  update_Category(id, data) {
    const url = `/category/${id}`;
    return axiosHeader.put(url, data);
  },
  GetAllCategory(page) {
    let url = `/category?page=${page}`;
    if (typeof page !== 'number' || page < 1) {
      url = "/category"
    }
    return axiosClient.get(url);
  },
  GetAllCategoryAdmin(page, search) {
    let url = `/category/admin?page=${page}&search=${search}`;
    return axiosClient.get(url);
  },
  GetCategoryById(id) {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },
  //Item
  search(query, page) {
    const url = `/item/search?q=${query}&page=${page}`;
    return axiosClient.get(url);
  },
  GetItemByCategoryId(id, page) {
    const url = `/item/category?id=${id}&page=${page}`;
    return axiosClient.get(url);
  },
  GetListItems(page, search, count) {
    const url = `/item?page=${page}&search=${search}&count=${count}`;
    return axiosClient.get(url);
  },
  GetListItemsHone(page) {
    const url = `/item?page=${page}`;
    return axiosClient.get(url);
  },
  get_items(id) {
    const url = `/item/${id}`;
    return axiosClient.get(url);
  },
  delete_Items(data) {
    const url = `/item/many`;
    return axiosClient.delete(url, {
      data: { data },
    });
  },
  create_Items(data) {
    const url = `/item`;
    return axiosHeader.post(url, data);
  },
  update_Items(id, data) {
    const url = `/item/${id}`;
    return axiosHeader.put(url, data);
  }
};

export default itemApi;
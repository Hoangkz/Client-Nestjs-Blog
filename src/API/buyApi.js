import axiosClient from "./axiosClient";
const buyApi = {
  Cart_Items(data) {
    const url = `/buys/cart-items`;
    return axiosClient.post(url,data);
  },
  list_cart(page) {
    const url = `/buys/list-carts?page=${page}`;
    return axiosClient.get(url);
  },
  delete_cart(data) {
    const url = `/buys/delete-carts`;
    return axiosClient.post(url,data);
  },
  buys_carts(data) {
    const url = `/buys/buys-carts`;
    return axiosClient.post(url,data);
  },
  list_cart_order(page) {
    const url = `/buys/order-carts?page=${page}`;
    return axiosClient.get(url);
  },
  admin_list_cart_order(data,page) {
    const url = `/buys/admin-order-carts?page=${page}`;
    return axiosClient.post(url,data);
  },
  cancel_cart_order(data) {
    const url = `/buys/cancel-order-carts`;
    return axiosClient.post(url,data);
  },
  ship_carts(data) {
    const url = `/buys/ship-carts`;
    return axiosClient.post(url,data);
  },
};

export default buyApi;
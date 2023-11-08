import { BASE_URL } from "@/contants/environment";
import instanceAxios from "@/utils/configAxios";
import axios from "axios";

export const cartService = {
  //   getCart: (payload, _token) => {
  //     return axios({
  //       method: "get",
  //       url: `${BASE_URL}/api/cart/get-all-cart`,
  //       headers: { token: `Bearer ${_token}`, user_id: `${payload}` },
  //     });
  //   },
  getCart: (payload, token) => {
    return instanceAxios.get(`/api/cart/get-all-cart`, {
      headers: { token: `Bearer ${token}` },
    });
  },
  createCart: (payload, token) => {
    return instanceAxios.post(`/api/cart/create-cart`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
  updateCart: (payload, token) => {
    return instanceAxios.put(`/api/cart/update-cart`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
};

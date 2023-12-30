import instanceAxios from "@/utils/configAxios";

export const cartService = {
  getCart: (token) => {
    return instanceAxios.get(`/api/cart/get-all-cart`, {
      headers: { token: `Bearer ${token}` },
    });
  },
  updateCart: (payload, token) => {
    return instanceAxios.put(`/api/cart/update-cart`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
};

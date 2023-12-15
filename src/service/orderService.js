import instanceAxios from "@/utils/configAxios";

export const orderService = {
  createOrder: (payload, token) => {
    return instanceAxios.post(`/api/order/create`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
  getOrderUser: (token) => {
    return instanceAxios.get(`/api/order/get-order-user`, {
      headers: { token: `Bearer ${token}` },
    });
  },
  updateOrder: (payload, order_id, token) => {
    return instanceAxios.put(`/api/order/update-order/${order_id}`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
};

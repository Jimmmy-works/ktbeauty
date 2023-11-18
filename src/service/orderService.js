import { BASE_URL } from "@/contants/environment";
import instanceAxios from "@/utils/configAxios";
import axios from "axios";

export const orderService = {
  createOrder: (payload, token) => {
    return instanceAxios.post(`/api/order/create`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
};

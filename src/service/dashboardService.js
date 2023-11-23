import { BASE_URL } from "@/contants/environment";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import instanceAxios from "@/utils/configAxios";
import React from "react";

const dashboardService = {
  getAllProfile: (token) => {
    return instanceAxios.get(`${BASE_URL}/api/user/get-all-user`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getAllOrder: (token) => {
    return instanceAxios.get(`${BASE_URL}/api/order/get-all-order`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  deleteProfile: (id, token) => {
    return instanceAxios.delete(`${BASE_URL}/api/user/delete-user/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  deleteProduct: (id, token) => {
    return instanceAxios.delete(
      `${BASE_URL}/api/product/delete-product/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  },
  updateProduct: (id, payload) => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    return instanceAxios.put(`api/product/update-product/${id}`, payload, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  createProduct: (payload, token) => {
    return instanceAxios.post(
      `${BASE_URL}/api/product/create-product`,
      payload,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  },
};
export default dashboardService;

import { BASE_URL } from "@/contants/environment";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import instanceAxios from "@/utils/configAxios";
import React from "react";

const dashboardService = {
  ///// USER
  getAllProfile: (token) => {
    return instanceAxios.get(`${BASE_URL}/api/user/get-all-user`, {
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
  ////// Order
  getAllOrder: (token) => {
    return instanceAxios.get(`${BASE_URL}/api/order/get-all-order`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  getDetailOrder: (id, token) => {
    return instanceAxios.get(`${BASE_URL}/api/order/get-detail-order/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  deleteOrder: (id, token) => {
    return instanceAxios.delete(`/api/order/delete-order/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
  },
  ////// Category
  createCategory: (payload, token) => {
    return instanceAxios.post(`/api/category/create-category`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
  updateCategory: (payload, token) => {
    return instanceAxios.put(
      `/api/category/update-category/${payload?._id}`,
      { name: payload?.name },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
  },
  deleteCategory: (id, token) => {
    return instanceAxios.delete(`/api/category/delete-category/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
  },
  ////// Product
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

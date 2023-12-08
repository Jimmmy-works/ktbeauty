import { BASE_URL } from "@/contants/environment";
import axios from "axios";

export const productService = {
  getAllCategories: () => {
    return axios.get(`${BASE_URL}/api/category/get-all-category`);
  },
  getAllProduct: (payload) => {
    return axios.get(
      `${BASE_URL}/api/product/get-all-product?limit=${
        payload?.limit || 9
      }&page=${payload?.page || 0}`
    );
  },
  getProductById: (id) => {
    return axios.get(`${BASE_URL}/api/product/get-detail-product/${id}`);
  },
  getProductSelected: (query) => {
    return axios.get(`${BASE_URL}/api/product/get-all-product-client?${query}`);
  },
};

export default productService;

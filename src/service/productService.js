import { BASE_URL } from "@/contants/environment";
import axios from "axios";

export const productService = {
  getAllCategories: () => {
    return axios.get(`${BASE_URL}/api/category/get-all-category`);
  },
  getAllProduct: (payload) => {
    if (payload) {
      return axios.get(
        `${BASE_URL}/api/product/get-all-product?limit=${payload?.limit}&page=${payload?.page}`
      );
    } else {
      return axios.get(`${BASE_URL}/api/product/get-all-product`);
    }
  },
  getTopRate: (param) => {
    return axios.get(`${BASE_URL}/api/product/get-top-rate${param}`);
  },
  getProductById: (id) => {
    return axios.get(`${BASE_URL}/api/product/get-detail-product/${id}`);
  },
  getProductSelected: (query) => {
    return axios.get(`${BASE_URL}/api/product/get-all-product-client${query}`);
  },
};

export default productService;

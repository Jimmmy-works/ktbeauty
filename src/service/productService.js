import { BASE_URL } from "@/contants/environment";
import axios from "axios";

export const productService = {
  getAllCategories: () => {
    return axios.get(`${BASE_URL}/api/category/get-all-category`);
  },
  getAllProduct: (payload) => {
    return axios.get(
      `${BASE_URL}/api/product/get-all-product?limit=${payload?.limit}&page=${payload?.page}`
    );
  },
  getProductById: (id) => {
    return axios.get(`${BASE_URL}/api/product/get-detail-product/${id}`);
  },
};

export default productService;

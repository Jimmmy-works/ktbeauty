import { BASE_URL } from "@/contants/environment";
import instanceAxios from "@/utils/configAxios";
import axios from "axios";

export const productService = {
  getAllCategories: () => {
    return axios.get(`${BASE_URL}/api/category/get-all-category`);
  },
  getAllProduct: () => {
    return axios.get(`${BASE_URL}/api/product/get-all-product`);
  },
  getProductBySlug: (id) => {
    return axios.get(`${BASE_URL}/api/product/get-detail-product/${id}`);
  },
};

export default productService;

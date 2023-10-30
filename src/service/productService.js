import { BASE_URL } from "@/contants/environment";
import axios from "axios";

export const productService = {
  getAllCategories: () => {
    return axios.get(`${BASE_URL}/api/category/get-all-category`);
  },
  getAllProduct: () => {
    return axios.get(`${BASE_URL}/api/product/get-all-product`);
  },
};

export default productService;

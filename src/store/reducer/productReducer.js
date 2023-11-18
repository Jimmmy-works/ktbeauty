import { LOCAL_STORAGE } from "@/contants/localStorage";
import dashboardService from "@/service/dashboardService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions, authReducer } from "./authReducer";
import { message } from "antd";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import productService from "@/service/productService";
import { useParams } from "react-router-dom";

const initialState = {
  categories: [],
  products: [],
  productSearch: {},
  searchProducts: [],
  productDetail: null,
  statusGetProductDetail: THUNK_STATUS.fulfilled,
  statusGetProduct: null,
  /// filter
};
export const { reducer: productReducer, actions: productActions } = createSlice(
  {
    initialState,
    name: "product",
    reducers: {
      setCategories: (state, action) => {
        state.categories = action.payload;
      },
      setProducts: (state, action) => {
        state.products = action.payload;
      },
      setProductDetail: (state, action) => {
        state.productDetail = action.payload;
      },
      setSearchProducts: (state, action) => {
        state.searchProducts = action.payload;
      },
    },
    extraReducers: (builder) => {
      //statusGetProductDetail
      builder.addCase(getProductDetail.pending, (state) => {
        state.statusGetProductDetail = THUNK_STATUS.pending;
      });
      builder.addCase(getProductDetail.fulfilled, (state) => {
        state.statusGetProductDetail = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getProductDetail.rejected, (state) => {
        state.statusGetProductDetail = THUNK_STATUS.rejected;
      });
      //statusGetProduct
      builder.addCase(getAllProduct.pending, (state) => {
        state.statusGetProduct = THUNK_STATUS.pending;
      });
      builder.addCase(getAllProduct.fulfilled, (state) => {
        state.statusGetProduct = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getAllProduct.rejected, (state) => {
        state.statusGetProduct = THUNK_STATUS.rejected;
      });
    },
  }
);
export const getAllCategories = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getAllCategories();
      thunkAPI.dispatch(productActions.setCategories(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getAllProduct = createAsyncThunk(
  "product/get",
  async (_, thunkAPI) => {
    try {
      const payloadPagination = { limit: 9, page: 0 };
      const response = await productService.getAllProduct(payloadPagination);
      thunkAPI.dispatch(productActions.setProducts(response?.data?.data));
      thunkAPI.dispatch(productActions.setSearchProducts(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getProductDetail = createAsyncThunk(
  "product-detail/get/",
  async (slug, thunkAPI) => {
    try {
      const reponse = await productService.getProductById(slug);
      thunkAPI.dispatch(productActions.setProductDetail(reponse?.data?.data));
      return reponse?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

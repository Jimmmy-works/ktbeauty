import { LOCAL_STORAGE } from "@/contants/localStorage";
import dashboardService from "@/service/dashboardService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions, authReducer } from "./authReducer";
import { message } from "antd";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import productService from "@/service/productService";

const initialState = {
  categories: [],
  products: [],
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
      const response = await productService.getAllProduct();
      thunkAPI.dispatch(productActions.setProducts(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

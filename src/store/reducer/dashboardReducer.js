import { LOCAL_STORAGE } from "@/contants/localStorage";
import dashboardService from "@/service/dashboardService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions, authReducer } from "./authReducer";
import { message } from "antd";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { getAllProduct } from "./productReducer";

const initialState = {
  users: [],
  searchUsers: [],
  errorGetUserAll: null,
  getStatusCreateProduct: null,
};
export const { reducer: dashboardReducer, actions: dashboardActions } =
  createSlice({
    initialState,
    name: "dashboard",
    reducers: {
      setUsers: (state, action) => {
        state.users = action.payload;
      },
      setSearchUsers: (state, action) => {
        state.searchUsers = action.payload;
      },
    },
    extraReducers: (builder) => {
      // errorGetUserAll status
      builder.addCase(getAllUsers.pending, (state) => {
        state.errorGetUserAll = THUNK_STATUS.pending;
      });
      builder.addCase(getAllUsers.fulfilled, (state) => {
        state.errorGetUserAll = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getAllUsers.rejected, (state) => {
        state.errorGetUserAll = THUNK_STATUS.rejected;
      });
      // getStatusCreateProduct status
      builder.addCase(createProduct.pending, (state) => {
        state.getStatusCreateProduct = THUNK_STATUS.pending;
      });
      builder.addCase(createProduct.fulfilled, (state) => {
        console.log("state", state);
        state.getStatusCreateProduct = THUNK_STATUS.fulfilled;
      });
      builder.addCase(createProduct.rejected, (state) => {
        state.getStatusCreateProduct = THUNK_STATUS.rejected;
      });
    },
  });
export const getAllUsers = createAsyncThunk(
  "dashboard/user/get",
  async (_, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const userData = await dashboardService.getAllProfile(_token);
      thunkAPI.dispatch(dashboardActions.setUsers(userData?.data?.data));
      thunkAPI.dispatch(dashboardActions.setSearchUsers(userData?.data?.data));
      return userData?.data?.data;
    } catch (error) {
      if (error) {
        thunkAPI.dispatch(authActions.setProfile(null));
        localStorage.removeItem(LOCAL_STORAGE.refreshToken);
        localStorage.removeItem(LOCAL_STORAGE.token);
      }
      message.error(
        `Tài khoản của bạn không thể thực hiện chức năng ở trang này!`
      );
      console.log("error", error);
      throw error;
    }
  }
);
export const createProduct = createAsyncThunk(
  "dashboard/product/post",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const productData = await dashboardService.createProduct(payload, _token);
      thunkAPI.dispatch(getAllProduct(_token));
      message.success(productData?.data?.message);
      return productData?.data?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

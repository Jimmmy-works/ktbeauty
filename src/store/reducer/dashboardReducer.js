import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import dashboardService from "@/service/dashboardService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { authActions } from "./authReducer";
import { getAllProduct } from "./productReducer";

const initialState = {
  users: [],
  ////
  orders: [],
  detailOrder: null,
  ////
  statusGetAllUsers: null,
  statusGetAllOrders: null,
  getStatusCreateProduct: null,
  ////////
  soldProducts: null,
  revenue: null,
  inventory: null,
};
export const { reducer: dashboardReducer, actions: dashboardActions } =
  createSlice({
    initialState,
    name: "dashboard",
    reducers: {
      setUsers: (state, action) => {
        state.users = action.payload;
      },
      setOrders: (state, action) => {
        state.orders = action.payload;
      },
      setDetailOrder: (state, action) => {
        state.detailOrder = action.payload;
      },
      setSoldProducts: (state, action) => {
        state.soldProducts = action.payload;
      },
      setRevenue: (state, action) => {
        state.revenue = action.payload;
      },
      setInventory: (state, action) => {
        state.inventory = action.payload;
      },
    },
    extraReducers: (builder) => {
      // statusGetAllUsers status
      builder.addCase(getAllUsers.pending, (state) => {
        state.statusGetAllUsers = THUNK_STATUS.pending;
      });
      builder.addCase(getAllUsers.fulfilled, (state) => {
        state.statusGetAllUsers = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getAllUsers.rejected, (state) => {
        state.statusGetAllUsers = THUNK_STATUS.rejected;
      });
      // statusGetAllUsers status
      builder.addCase(getAllOrder.pending, (state) => {
        state.statusGetAllOrders = THUNK_STATUS.pending;
      });
      builder.addCase(getAllOrder.fulfilled, (state) => {
        state.statusGetAllOrders = THUNK_STATUS.fulfilled;
      });
      builder.addCase(getAllOrder.rejected, (state) => {
        state.statusGetAllOrders = THUNK_STATUS.rejected;
      });
      // getStatusCreateProduct status
      builder.addCase(createProduct.pending, (state) => {
        state.getStatusCreateProduct = THUNK_STATUS.pending;
      });
      builder.addCase(createProduct.fulfilled, (state) => {
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
export const getAllOrder = createAsyncThunk(
  "dashboard/order/get",
  async (_, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const orderData = await dashboardService.getAllOrder(_token);
      if (orderData?.status === 200) {
        thunkAPI.dispatch(dashboardActions.setOrders(orderData?.data?.data));
      }
      return orderData?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getDetailOrder = createAsyncThunk(
  "dashboard/user/get",
  async (orderId, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const orderDetail = await dashboardService.getDetailOrder(
        orderId,
        _token
      );
      if (orderDetail?.status === 200) {
        thunkAPI.dispatch(
          dashboardActions.setDetailOrder(orderDetail?.data?.data)
        );
      }
      return orderDetail?.data?.data;
    } catch (error) {
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
      return productData?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

export const getSoldProducts = createAsyncThunk(
  "dashboard/product/get/sold",
  async (param, thunkAPI) => {
    try {
      const soldData = await dashboardService.getSoldProducts(param);
      if (soldData?.status === 200) {
        thunkAPI.dispatch(dashboardActions.setSoldProducts(soldData?.data));
      }
      return soldData?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getRevenue = createAsyncThunk(
  "dashboard/product/get/revenue",
  async (param, thunkAPI) => {
    try {
      const revenueData = await dashboardService.getRevenue(param);
      if (revenueData?.status === 200) {
        thunkAPI.dispatch(dashboardActions.setRevenue(revenueData?.data));
      }
      return revenueData?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const getTopRate = createAsyncThunk(
  "dashboard/product/get/inventory",
  async (param, thunkAPI) => {
    try {
      const inventotyData = await dashboardService.getTopRate(param);
      if (inventotyData?.status === 200) {
        thunkAPI.dispatch(dashboardActions.setInventory(inventotyData?.data));
      }
      return inventotyData?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

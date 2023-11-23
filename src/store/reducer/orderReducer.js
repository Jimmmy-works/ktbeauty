import { LOCAL_STORAGE } from "@/contants/localStorage";
import { orderService } from "@/service/orderService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { cartActions } from "./cartReducer";
import { decodeToken } from "react-jwt";
import { THUNK_STATUS } from "@/contants/thunkstatus";

const initialState = {
  orderList: {},
  statusGetOrderUser: THUNK_STATUS.pending,
};
export const { reducer: orderReducer, actions: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderUser.pending, (state) => {
      state.statusGetOrderUser = THUNK_STATUS.pending;
    });
    builder.addCase(getOrderUser.fulfilled, (state) => {
      state.statusGetOrderUser = THUNK_STATUS.fulfilled;
    });
    builder.addCase(getOrderUser.rejected, (state) => {
      state.statusGetOrderUser = THUNK_STATUS.rejected;
    });
  },
});
export const createOrder = createAsyncThunk(
  "order/create",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const decode = decodeToken(localStorage.getItem(LOCAL_STORAGE.token));

      const response = await orderService.createOrder(payload, _token);
      if (response?.status === 200) {
        thunkAPI.dispatch(
          cartActions.setCartInfo({
            user: {
              user_id: decode?.id,
            },
            products: [],
          })
        );
        thunkAPI.dispatch(cartActions.setShipping({}));
        thunkAPI.dispatch(cartActions.setDiscountCode({}));
        thunkAPI.dispatch(cartActions.setTotal(0));
        thunkAPI.dispatch(cartActions.setSubTotal(0));
      }
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getOrderUser = createAsyncThunk(
  "order/create",
  async (_, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await orderService.getOrderUser(_token);
      if (response?.status === 200) {
        thunkAPI.dispatch(orderActions.setOrderList(response?.data?.data));
      }
      message.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

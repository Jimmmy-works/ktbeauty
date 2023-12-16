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
  statusCreateOrder: THUNK_STATUS.fulfilled,
};
export const { reducer: orderReducer, actions: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setStatusCreateOrder: (state, action) => {
      state.statusCreateOrder = action.payload;
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
    // getStatusOrder status
    builder.addCase(updataStatusOrder.pending, (state) => {
      state.getStatusOrder = THUNK_STATUS.pending;
    });
    builder.addCase(updataStatusOrder.fulfilled, (state) => {
      state.getStatusOrder = THUNK_STATUS.fulfilled;
    });
    builder.addCase(updataStatusOrder.rejected, (state) => {
      state.getStatusOrder = THUNK_STATUS.rejected;
    });
    //CreateOrder status
    builder.addCase(createOrder.pending, (state) => {
      state.statusCreateOrder = THUNK_STATUS.pending;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.statusCreateOrder = THUNK_STATUS.fulfilled;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.statusCreateOrder = THUNK_STATUS.rejected;
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
        thunkAPI.dispatch(
          cartActions.setShipping({
            value: "default",
            label: "Chọn phương thức",
            price: 0,
          })
        );
        thunkAPI.dispatch(cartActions.setDiscountCode({}));
        thunkAPI.dispatch(cartActions.setTotal(0));
        thunkAPI.dispatch(cartActions.setSubTotal(0));
        message.success(response?.data?.message);
      }
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
      thunkAPI.dispatch(
        orderActions.setStatusCreateOrder(THUNK_STATUS.fulfilled)
      );
      thunkAPI.dispatch(cartActions.setDiscountCode({}));
      thunkAPI.dispatch(cartActions.setTotal(0));
      thunkAPI.dispatch(cartActions.setSubTotal(0));
      throw error;
    }
  }
);
export const getOrderUser = createAsyncThunk(
  "order/get/user",
  async (_, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await orderService.getOrderUser(_token);
      if (response?.status === 200) {
        thunkAPI.dispatch(orderActions.setOrderList(response?.data?.data));
      }
      // message.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);
export const updataStatusOrder = createAsyncThunk(
  "order/put/cancel",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const newPayload = {
        status: payload?.status,
        user_id: payload?.user_id,
      };
      const response = await orderService.updateOrder(
        newPayload,
        payload?._id,
        _token
      );
      if (response?.status === 200) {
        thunkAPI.dispatch(getOrderUser(_token));
      }
      return response;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

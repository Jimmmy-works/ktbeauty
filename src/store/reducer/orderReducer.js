import { LOCAL_STORAGE } from "@/contants/localStorage";
import { orderService } from "@/service/orderService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: {},
};
export const { reducer: orderReducer, actions: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
});
export const createOrder = createAsyncThunk(
  "order/create",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);

      console.log("payload", payload);
      const response = await orderService.createOrder(payload, _token);
      if (response?.status === 200) {
        thunkAPI.dispatch(orderActions.setOrderList(response?.data?.data));
      }
      console.log("response", response);
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

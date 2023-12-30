import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { whiteListService } from "@/service/whitelistService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const initialState = {
  whiteListInfo: {},
  statusUpdateWhiteList: THUNK_STATUS.fulfilled,
  statusGetWhiteList: THUNK_STATUS.fulfilled,
};

export const { reducer: whiteListReducer, actions: whiteListActions } =
  createSlice({
    initialState,
    name: "whitelist",
    reducers: {
      setWhiteListInfo: (state, action) => {
        state.whiteListInfo = action.payload || state.cartInfo || {};
      },
    },
    extraReducers: (builder) => {
      /// statusUpdateWhitelist
      builder.addCase(updateWhiteList.pending, (state) => {
        state.statusUpdateWhiteList = THUNK_STATUS.pending;
      });
      builder.addCase(updateWhiteList.fulfilled, (state, action) => {
        state.statusUpdateWhiteList = THUNK_STATUS.fulfilled;
        state.whiteListInfo = action.payload;
      });
      builder.addCase(updateWhiteList.rejected, (state) => {
        state.statusUpdateWhiteList = THUNK_STATUS.rejected;
      });
      /// statusGetWhitelist
      builder.addCase(getWhiteList.pending, (state) => {
        state.statusGetWhiteList = THUNK_STATUS.pending;
      });
      builder.addCase(getWhiteList.fulfilled, (state, action) => {
        state.statusGetWhiteList = THUNK_STATUS.fulfilled;
        state.whiteListInfo = action.payload;
      });
      builder.addCase(getWhiteList.rejected, (state) => {
        state.statusGetWhiteList = THUNK_STATUS.rejected;
      });
    },
  });

export const getWhiteList = createAsyncThunk(
  "whiteList/get",
  async (_, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await whiteListService.getWhiteList(_token);
      const resWhiteList = response?.data?.data;
      thunkAPI.fulfillWithValue(resWhiteList);
      return resWhiteList;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  }
);
export const updateWhiteList = createAsyncThunk(
  "whiteList/put",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      if (_token) {
        const customPayload = {
          ...payload,
          user_id: payload?.user?.user_id,
        };
        const response = await whiteListService.updateWhiteList(
          customPayload,
          _token
        );
        const resWhiteList = response?.data?.data;
        thunkAPI.fulfillWithValue(resWhiteList);
        return resWhiteList;
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

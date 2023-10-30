import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import authService from "@/service/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { decodeToken } from "react-jwt";
const initialState = {
  profile: null,
  listOrder: null,
  updateStatusRegister: THUNK_STATUS.fulfilled,
  updateStatusLogin: THUNK_STATUS.fulfilled,
  loginError: null,
};
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.token);
      localStorage.removeItem(LOCAL_STORAGE.refreshToken);
      state.profile = null;
      message.success(`Đăng xuất thành công`);
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register status
    builder.addCase(register.pending, (state) => {
      state.updateStatusRegister = THUNK_STATUS.pending;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.updateStatusRegister = THUNK_STATUS.fulfilled;
    });
    builder.addCase(register.rejected, (state) => {
      state.updateStatusRegister = THUNK_STATUS.rejected;
    });
    // Login status
    builder.addCase(signin.pending, (state) => {
      state.updateStatusLogin = THUNK_STATUS.pending;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.updateStatusLogin = THUNK_STATUS.fulfilled;
    });
    builder.addCase(signin.rejected, (state) => {
      state.updateStatusLogin = THUNK_STATUS.rejected;
    });
  },
});
export const signin = createAsyncThunk(
  "auth/signin",
  async (payload, thunkAPI) => {
    try {
      // user login
      const resUserSignin = await authService.signin(payload);
      // connect  admin
      const signinRes = resUserSignin?.data?.data;
      // save localStorage => refreshToken interceptors
      console.log("signinRes", signinRes);
      localStorage.setItem(LOCAL_STORAGE.token, signinRes?.access_token);
      localStorage.setItem(
        LOCAL_STORAGE.refreshToken,
        signinRes?.refresh_token
      );
      // decode token
      const decodeTokenRes = decodeToken(
        localStorage.getItem(LOCAL_STORAGE.token)
      );
      /// get profile after login
      const resUserDetail = await authService.getProfileSlug(
        decodeTokenRes?.id,
        localStorage.getItem(LOCAL_STORAGE.token)
      );
      console.log("resUserDetail", resUserDetail);
      if (resUserDetail?.status === 200) {
        thunkAPI.dispatch(authActions.setProfile(resUserDetail?.data?.data));
        message.success(resUserSignin?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const response = await authService.register(payload);
      if (response?.status === 200) {
        message.success(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);

      console.log("error", error);
      throw error;
    }
  }
);
export const getProfileSlug = createAsyncThunk(
  "auth/profile/get",
  async (id, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const dataProfile = await authService.getProfileSlug(id, _token);
      thunkAPI.dispatch(authActions.setProfile(dataProfile?.data?.data));
      message.success(dataProfile?.data?.message);
      return dataProfile?.data?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

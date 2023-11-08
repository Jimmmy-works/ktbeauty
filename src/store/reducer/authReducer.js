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
  checkLogin: false,
};
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.token);
      localStorage.removeItem(LOCAL_STORAGE.refreshToken);
      state.profile = null;
      state.checkLogin = false;
      message.success(`Đăng xuất thành công`);
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    checkLogin: (state, action) => {
      state.checkLogin = action.payload;
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
      if (resUserDetail?.status === 200) {
        thunkAPI.dispatch(authActions.setProfile(resUserDetail?.data?.data));
        thunkAPI.dispatch(authActions.checkLogin(true));
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
export const updateProfile = createAsyncThunk(
  "auth/profile/put/info",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const dataUpdateProfilce = await authService.updateProfile(
        payload.id,
        payload.value,
        _token
      );
      const _id = decodeToken(_token);
      if (dataUpdateProfilce?.status === 200) {
        thunkAPI.dispatch(getProfileSlug(_id?.id));
      }
      message.success(dataUpdateProfilce?.data?.message);
      return dataUpdateProfilce?.data?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/profile/put/password",
  async (payload) => {
    try {
      const dataChangePassword = await authService.changePassword(payload);
      console.log("dataChangePassword", dataChangePassword);
      message.success(dataChangePassword?.data?.message);

      return dataChangePassword?.data?.data;
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
      throw error;
    }
  }
);

import { LOCAL_STORAGE } from "/src/contants/localStorage.js";
import authService from "/src/service/authService.js";
import { createAsyncThunk } from "/node_modules/.vite/deps/@reduxjs_toolkit.js?v=b2c817c8";
import { message } from "/node_modules/.vite/deps/antd.js?v=b2c817c8";

export const signin = createAsyncThunk(
  "auth/signin",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.signin(payload);
      const signinRes = res?.data?.data;
      localStorage.setItem(LOCAL_STORAGE.token, signinRes?.access_token);
      localStorage.setItem(
        LOCAL_STORAGE.refreshToken,
        signinRes?.refresh_token
      );
      console.log("first", signinRes?.access_token);
      //   const profileRes = await authService.getProfile(signinRes?.access_token);
      console.log("first", profileRes);
      message.success(res?.data?.message);
      //   thunkAPI.dispatch(setProfile(resProfile?.data?.data));
      thunkAPI.dispatch(setProfile(signinRes));
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

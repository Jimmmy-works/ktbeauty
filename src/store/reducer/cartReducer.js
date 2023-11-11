import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartService } from "@/service/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { decodeToken } from "react-jwt";

const initialState = {
  cartInfo: {},
  subTotal: 0,
  total: 0,
  shipping: {},
  discountCode: {},
  updateStatusCreateCart: THUNK_STATUS.fulfilled,
};

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  initialState,
  name: "cart",

  reducers: {
    setCartInfo: (state, action) => {
      state.cartInfo = {
        ...action.payload,
      };
    },
    getDiscountCode: () => {},
    setShipping: (state, action) => {
      state.shipping = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.shipping));
    },
    setDiscountCode: (state, action) => {
      state.discountCode = action.payload;
      localStorage.setItem("discount", JSON.stringify(state.discountCode));
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
      localStorage.setItem("subTotal", state.subTotal);
    },
    setTotal: (state, action) => {
      state.total = action.payload;
      localStorage.setItem("total", state.total);
    },
    addToCart: (state, action) => {
      const million = 1000000;
      const saveLocal = {
        ...state?.cartInfo,
        products: state?.cartInfo?.products.map((item, index) => {
          if (item?._id === action?.payload?.id) {
            item.quantity = action?.payload?.updateQuantity;
          }
          return item;
        }),
      };
      localStorage.setItem("cart", JSON.stringify(saveLocal));
      const parseCart = localStorage.getItem("cart");
      state.cartInfo = JSON.parse(parseCart);
    },
  },
  extraReducers: (builder) => {
    /// updateStatusCreateCart
    builder.addCase(createCart.pending, (state) => {
      state.updateStatusCreateCart = THUNK_STATUS.pending;
    });
    builder.addCase(createCart.fulfilled, (state) => {
      state.updateStatusCreateCart = THUNK_STATUS.fulfilled;
    });
    builder.addCase(createCart.rejected, (state) => {
      state.updateStatusCreateCart = THUNK_STATUS.rejected;
    });
  },
});

export const getCart = createAsyncThunk("cart/get", async (token, thunkAPI) => {
  try {
    const decode = decodeToken(token);
    const response = await cartService.getCart(decode?.id, token);
    if (response.status === 200) {
      const resCart = response?.data?.data;
      const million = 1000000;
      const parseCart = JSON.parse(localStorage.getItem("cart"));
      thunkAPI.dispatch(
        cartActions.setCartInfo(parseCart ? parseCart : resCart)
      );
    }
    return response?.data?.data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    console.log("error", error);
    throw error;
  }
});
export const createCart = createAsyncThunk(
  "cart/post",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await cartService.createCart(payload, _token);
      if (response.status === 200) {
        thunkAPI.dispatch(getCart(_token));
      }
      message.success(
        `Đã thêm ${payload?.quantity} sản phẩm - ${payload?.name} `
      );
      return response?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);
export const updateCart = createAsyncThunk(
  "cart/put",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const reponse = await cartService.updateCart(payload, _token);
      message.success(reponse?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

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
  updateStatusUpdateCart: THUNK_STATUS.fulfilled,
  statusGetCart: null,
  ///
  minPrice: 0,
  maxPrice: 60000,
};

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    addToCart: (state, action) => {
      const saveLocal = {
        ...state?.cartInfo,
        products: state?.cartInfo?.products.map((item) => {
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
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setCartInfo: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo || {};
      // localStorage.setItem("cart", JSON.stringify(state.cartInfo));
    },
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
  },
  extraReducers: (builder) => {
    /// updateStatusUpdateCart
    builder.addCase(updateCart.pending, (state) => {
      state.updateStatusUpdateCart = THUNK_STATUS.pending;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.updateStatusUpdateCart = THUNK_STATUS.fulfilled;
      state.cartInfo = action.payload;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.updateStatusUpdateCart = THUNK_STATUS.rejected;
    });
    /// statusGetCart
    builder.addCase(getCart.pending, (state) => {
      state.statusGetCart = THUNK_STATUS.pending;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.statusGetCart = THUNK_STATUS.fulfilled;
      state.cartInfo = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.statusGetCart = THUNK_STATUS.rejected;
    });
  },
});

// export const getCart = createAsyncThunk("cart/get", async (_, thunkAPI) => {
//   try {
//     const _token = localStorage.getItem(LOCAL_STORAGE.token);
//     const response = await cartService.getCart(_token);
//     const resCart = response?.data?.data;
//     if (response.status === 200) {
//       thunkAPI.fulfillWithValue(resCart);
//     }
//     return resCart;
//   } catch (error) {
//     message.error(error?.response?.data?.message);
//     console.log("error", error);
//     throw error;
//   }
// });

export const getCart = createAsyncThunk("cart/get", async (_, thunkAPI) => {
  try {
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    const response = await cartService.getCart(_token);
    const resCart = response?.data?.data;
    thunkAPI.fulfillWithValue(resCart);
    return resCart;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
    throw error;
  }
});
export const updateCart = createAsyncThunk(
  "cart/put/updateCart",
  async (payload, thunkAPI) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      if (_token) {
        const customPayload = {
          ...payload,
          user_id: payload?.user?.user_id,
        };
        const response = await cartService.updateCart(customPayload, _token);
        const resCart = response?.data?.data;
        thunkAPI.fulfillWithValue(resCart);
        return resCart;
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  }
);

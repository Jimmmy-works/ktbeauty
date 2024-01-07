import { ENV } from "@/contants/environment";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducer/authReducer";
import { cartReducer } from "./reducer/cartReducer";
import { dashboardReducer } from "./reducer/dashboardReducer";
import { orderReducer } from "./reducer/orderReducer";
import { productReducer } from "./reducer/productReducer";
import { whiteListReducer } from "./reducer/whitelistReducer";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    whitelist: whiteListReducer,
  },
  middleware: [thunk],
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat({
  //     thunkMiddleware,
  //     serializableCheck: false,
  //   }),

  devTools: ENV === "development",
});
export default store;

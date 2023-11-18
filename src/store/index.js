import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer/authReducer";
import { ENV } from "@/contants/environment";
import thunkMiddleware from "redux-thunk";
import { dashboardReducer } from "./reducer/dashboardReducer";
import { productReducer } from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";
import thunk from "redux-thunk";
import { orderReducer } from "./reducer/orderReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: [thunk],
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(thunkMiddleware),
  // devTools: ENV === "development",
});
export default store;

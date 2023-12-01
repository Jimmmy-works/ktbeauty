import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authReducer } from "./reducer/authReducer";
import { cartReducer } from "./reducer/cartReducer";
import { dashboardReducer } from "./reducer/dashboardReducer";
import { orderReducer } from "./reducer/orderReducer";
import { productReducer } from "./reducer/productReducer";

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

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer/authReducer";
import { ENV } from "@/contants/environment";
import thunkMiddleware from "redux-thunk";
import { dashboardReducer } from "./reducer/dashboardReducer";
import { productReducer } from "./reducer/productReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});
export default store;

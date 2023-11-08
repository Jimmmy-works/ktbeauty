import { useState } from "react";
import "./tailwind.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PATHS } from "./contants/path";

const MainLayout = lazy(() => import("./layout/MainLayout"));
const HomePage = lazy(() => import("./page/HomePage"));
const Shop = lazy(() => import("./page/Shop"));
const Blog = lazy(() => import("./page/Blog"));
const AboutPage = lazy(() => import("./page/AboutPage"));
const ContactPage = lazy(() => import("./page/ContactPage"));
const ShopDetail = lazy(() => import("./page/Shop/ShopDetail"));
const CartPage = lazy(() => import("./page/CartPage"));
const Checkout = lazy(() => import("./page/Checkout"));
const OrderComplete = lazy(() => import("./page/OrderComplete"));
const ProfileLayout = lazy(() => import("./layout/ProfileLayout"));
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));

const Account = lazy(() => import("./page/Profile/Account"));
const Order = lazy(() => import("./page/Profile/Order"));
const WhiteList = lazy(() => import("./page/Profile/WhiteList"));
const Address = lazy(() => import("./page/Profile/Address"));

// import MainLayout from "./layout/MainLayout";
// import HomePage from "./page/HomePage";
// import Shop from "./page/Shop";
// import Blog from "./page/Blog";
// import AboutPage from "./page/AboutPage";
// import ContactPage from "./page/ContactPage";
// import ShopDetail from "./page/Shop/ShopDetail";
// import CartPage from "./page/CartPage";
// import Checkout from "./page/Checkout";
// import OrderComplete from "./page/OrderComplete";
// import ProfileLayout from "./layout/ProfileLayout";
// import Account from "./page/Profile/Account";
// import Order from "./page/Profile/Order";
// import WhiteList from "./page/Profile/WhiteList";
// import Address from "./page/Profile/Address";

// import DashboardLayout from "./layout/DashboardLayout";
import DashboardFile from "./page/CMS/File";
import DashboardImage from "./page/CMS/ImageProduct";
import { Provider } from "react-redux";
import DashboardUser from "./page/CMS/User";
import DashBoardProduct from "./page/CMS/Product";
import store from "./store";
import LoadingPage from "./components/Loading/LoadingPage";
import StatusShipping from "./page/CMS/StatusShipping";
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          <Routes></Routes>
          <Routes>
            <Route path={PATHS.HOME} element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path={PATHS.SHOP.INDEX} element={<Shop />} />
              <Route path={PATHS.SHOP.DETAIL} element={<ShopDetail />} />
              <Route path={PATHS.BLOG.INDEX} element={<Blog />} />
              <Route path={PATHS.ABOUT} element={<AboutPage />} />
              <Route path={PATHS.CONTACT} element={<ContactPage />} />
              <Route path={PATHS.CART} element={<CartPage />} />
              <Route path={PATHS.CHECKOUT} element={<Checkout />} />
              <Route path={PATHS.COMPLETE} element={<OrderComplete />} />
              <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
                <Route index element={<Account />} />
                <Route path={PATHS.PROFILE.ORDER} element={<Order />} />
                <Route path={PATHS.PROFILE.WHITELIST} element={<WhiteList />} />
                <Route path={PATHS.PROFILE.ADDRESS} element={<Address />} />
              </Route>
            </Route>
          </Routes>
          <Routes>
            <Route path={PATHS.CMS.INDEX} element={<DashboardLayout />}>
              <Route index element={<DashboardUser />} />
              <Route path={PATHS.CMS.PRODUCT} element={<DashBoardProduct />} />
              <Route path={PATHS.CMS.IMAGE} element={<DashboardImage />} />
              <Route path={PATHS.CMS.USER} element={<DashboardUser />} />
              <Route path={PATHS.CMS.FILE} element={<DashboardFile />} />
              <Route path={PATHS.CMS.SHIPPING} element={<StatusShipping />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;

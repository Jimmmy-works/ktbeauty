import { useState } from "react";
import "./tailwind.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { PATHS } from "./contants/path";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
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
// const Account = lazy(() => import("./page/Profile/Account"));
// const Order = lazy(() => import("./page/Profile/Order"));
// const WhiteList = lazy(() => import("./page/Profile/WhiteList"));
// const Address = lazy(() => import("./page/Profile/Address"));

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
import Account from "./page/Profile/Account";
import Order from "./page/Profile/Order";
import WhiteList from "./page/Profile/WhiteList";
import Address from "./page/Profile/Address";
import UserCMS from "./page/CMS/User/UserCMS";
import ProductCMS from "./page/CMS/Product/ProductCMS";
import DashBoardProduct from "./page/CMS/Product";
import DashboardUser from "./page/CMS/User";
import DashboardFile from "./page/CMS/File";
import DashboardTeam from "./page/CMS/Team";
import DashboardImage from "./page/CMS/ImageProduct";
// import DashboardLayout from "./layout/DashboardLayout";
function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
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
            <Route path={PATHS.CMS.TEAM} element={<DashboardTeam />} />
            <Route path={PATHS.CMS.FILE} element={<DashboardFile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

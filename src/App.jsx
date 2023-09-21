import { useState } from "react";
import "./tailwind.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { PATHS } from "./contants/path";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";
// const MainLayout = lazy(() => import("./layout/MainLayout"));
// const HomePage = lazy(() => import("./page/HomePage"));
// const Shop = lazy(() => import("./page/Shop"));
// const Blog = lazy(() => import("./page/Blog"));
// const AboutPage = lazy(() => import("./page/AboutPage"));
// const ContactPage = lazy(() => import("./page/ContactPage"));
// const ShopDetail = lazy(() => import("./page/Shop/ShopDetail"));
// const CartPage = lazy(() => import("./page/CartPage"));
// const Checkout = lazy(() => import("./page/Checkout"));
// const OrderComplete = lazy(() => import("./page/OrderComplete"));
import MainLayout from "./layout/MainLayout";
import HomePage from "./page/HomePage";
import Shop from "./page/Shop";
import Blog from "./page/Blog";
import AboutPage from "./page/AboutPage";
import ContactPage from "./page/ContactPage";
import ShopDetail from "./page/Shop/ShopDetail";
import CartPage from "./page/CartPage";
import Checkout from "./page/Checkout";
import OrderComplete from "./page/OrderComplete";
function App() {
  return (
    // <Suspense fallback={<LoadingPage />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
    // </Suspense>
  );
}

export default App;

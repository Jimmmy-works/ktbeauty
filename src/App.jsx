import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./contants/path";
import "./tailwind.scss";

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
// const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));

// const ProfileLayout = lazy(() => import("./layout/ProfileLayout"));
const Account = lazy(() => import("./page/Profile/Account"));
const Order = lazy(() => import("./page/Profile/Order"));
const WhiteList = lazy(() => import("./page/Profile/WhiteList"));
// const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

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

import ProfileLayout from "./layout/ProfileLayout";
// import Account from "./page/Profile/Account";
// import Order from "./page/Profile/Order";
// import WhiteList from "./page/Profile/WhiteList";
import PrivateRoute from "./components/PrivateRoute";

import DashboardLayout from "./layout/DashboardLayout";
import { Provider } from "react-redux";
// const PrivateRouteCMS = lazy(() =>
//   import("./components/PrivateRoute/PrivateRouteCMS")
// );
// const DashboardCategory = lazy(() => import("./page/CMS/Category"));
// const DashboardImage = lazy(() => import("./page/CMS/ImageProduct"));
// const DashboardOrder = lazy(() => import("./page/CMS/Order"));
// const DashBoardProduct = lazy(() => import("./page/CMS/Product"));
// const DashboardUser = lazy(() => import("./page/CMS/User"));
// const Page404 = lazy(() => import("./page/Page404"));

import LoadingPage from "./components/Loading/LoadingPage";
import PrivateRouteCMS from "./components/PrivateRoute/PrivateRouteCMS";
import DashboardCategory from "./page/CMS/Category";
import DashboardImage from "./page/CMS/ImageProduct";
import DashboardOrder from "./page/CMS/Order";
import DashBoardProduct from "./page/CMS/Product";
import DashboardUser from "./page/CMS/User";
import Page404 from "./page/Page404";
import store from "./store";
import DashboardAnalyst from "./page/CMS/Analyst";
import ConselPage from "./page/Consel";
function App() {
  return (
    <Provider store={store}>
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
              <Route path={PATHS.COUNSEL} element={<ConselPage />} />
              <Route path={PATHS.COMPLETE} element={<OrderComplete />} />
              <Route element={<PrivateRoute></PrivateRoute>}>
                <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
                  <Route index element={<Account />} />
                  <Route path={PATHS.PROFILE.ORDER} element={<Order />} />
                  <Route
                    path={PATHS.PROFILE.WHITELIST}
                    element={<WhiteList />}
                  />
                </Route>
              </Route>
            </Route>
            <Route element={<PrivateRouteCMS />}>
              <Route path={PATHS.CMS.INDEX} element={<DashboardLayout />}>
                <Route index element={<DashboardUser />} />
                <Route
                  path={PATHS.CMS.CATEGORY}
                  element={<DashboardCategory />}
                />
                <Route
                  path={PATHS.CMS.PRODUCT}
                  element={<DashBoardProduct />}
                />
                <Route path={PATHS.CMS.IMAGE} element={<DashboardImage />} />
                <Route path={PATHS.CMS.USER} element={<DashboardUser />} />
                <Route path={PATHS.CMS.ORDER} element={<DashboardOrder />} />
                <Route
                  path={PATHS.CMS.ANALYST}
                  element={<DashboardAnalyst />}
                />
                <Route path="" />
              </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;

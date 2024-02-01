import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./contants/path";
import { Provider } from "react-redux";
import store from "./store";
import "./tailwind.scss";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import ProfileLayout from "./layout/ProfileLayout";
import DashboardLayout from "./layout/DashboardLayout";
const HomePage = lazy(() => import("./page/HomePage"));
const Shop = lazy(() => import("./page/Shop"));
const Blog = lazy(() => import("./page/Blog"));
const AboutPage = lazy(() => import("./page/AboutPage"));
const ContactPage = lazy(() => import("./page/ContactPage"));
const ShopDetail = lazy(() => import("./page/Shop/ShopDetail"));
const CartPage = lazy(() => import("./page/CartPage"));
const Checkout = lazy(() => import("./page/Checkout"));
const OrderComplete = lazy(() => import("./page/OrderComplete"));
const Account = lazy(() => import("./page/Profile/Account"));
const Order = lazy(() => import("./page/Profile/Order"));
const WhiteList = lazy(() => import("./page/Profile/WhiteList"));
import LoadingPage from "./components/Loading/LoadingPage";
import PrivateRouteCMS from "./components/PrivateRoute/PrivateRouteCMS";
import DashboardCategory from "./page/CMS/Category";
import DashboardImage from "./page/CMS/ImageProduct";
import DashboardOrder from "./page/CMS/Order";
import DashBoardProduct from "./page/CMS/Product";
import DashboardUser from "./page/CMS/User";
import Page404 from "./page/Page404";
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

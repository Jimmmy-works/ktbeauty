import AuthenModal from "@/components/Authen";
import BackToTop from "@/components/BackToTop";
import { MainProvider } from "@/components/MainContext";
import { MainParamShopProvider } from "@/components/MainParamShopContext";
import Overplay from "@/components/Overplay";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import Footer from "@/page/Footer";
import Header from "@/page/Header";
import Nav from "@/page/Nav";
import { getProfileSlug } from "@/store/reducer/authReducer";
import { getCart } from "@/store/reducer/cartReducer";
import {
  getAllCategories,
  getAllProduct,
} from "@/store/reducer/productReducer";
import { getWhiteList } from "@/store/reducer/whitelistReducer";
import backtotop from "@/utils/backtotop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { checkLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    document.body.setAttribute("style", "overflow-y : scroll");
    backtotop();
  }, [pathname]);

  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  useEffect(() => {
    if (_token) {
      dispatch(getProfileSlug());
    }
    dispatch(getAllCategories());
  }, []);
  useEffect(() => {
    if (_token) {
      dispatch(getCart());
      dispatch(getWhiteList());
    }
  }, [checkLogin]);
  return (
    <MainProvider>
      <MainParamShopProvider>
        <Header />
        <Outlet />
        <Footer />
        <AuthenModal />
        <Overplay className={`z-50`} />
        <Nav />
        <BackToTop />
      </MainParamShopProvider>
    </MainProvider>
  );
};

export default MainLayout;

import AuthenModal from "@/components/Authen";
import BackToTop from "@/components/BackToTop";
import { MainProvider, useMainContext } from "@/components/MainContext";
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
import backtotop from "@/utils/backtotop";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { checkLogin } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   document.querySelector("html").setAttribute("style", "overflow-y : scroll");
  //   () => setIsNavbar(false);
  //   backtotop();
  // }, [pathname]);

  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  useEffect(() => {
    const resultDecode = decodeToken(_token);
    const _id = resultDecode?.id;
    if (_token) {
      dispatch(getProfileSlug(_id));
    }
    dispatch(getAllProduct());
    dispatch(getAllCategories());
  }, []);
  useEffect(() => {
    if (_token) {
      dispatch(getCart(_token));
    }
  }, [checkLogin]);
  return (
    <MainProvider>
      <Header />
      <Outlet />
      <Footer />
      <AuthenModal />
      <Overplay className={`z-50`} />
      <Nav />
      <BackToTop />
    </MainProvider>
  );
};

export default MainLayout;

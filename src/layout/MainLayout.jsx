import AuthenModal from "@/components/Authen";
import BackToTop from "@/components/BackToTop";
import { MainProvider, useMainContext } from "@/components/MainContext";
import Overplay from "@/components/Overplay";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import Footer from "@/page/Footer";
import Header from "@/page/Header";
import Nav from "@/page/Nav";
import { getProfileSlug } from "@/store/reducer/authReducer";
import {
  getAllCategories,
  getAllProduct,
} from "@/store/reducer/productReducer";
import backtotop from "@/utils/backtotop";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    document.querySelector("html").setAttribute("style", "overflow-y : scroll");
    () => setIsNavbar(false);
    backtotop();
  }, [pathname]);

  useEffect(() => {
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    const resultDecode = decodeToken(_token);
    const _id = resultDecode?.id;
    if (_token) {
      dispatch(getProfileSlug(_id));
      dispatch(getAllProduct());
      dispatch(getAllCategories());
      // dispatch(getCart(_token));
    }
  }, []);
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

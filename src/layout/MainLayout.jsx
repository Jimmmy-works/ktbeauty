import AuthenModal from "@/components/Authen";
import Login from "@/components/Authen/Login";
import Register from "@/components/Authen/Register";
import BackToTop from "@/components/BackToTop";
import LoadingPage from "@/components/LoadingPage";
import { MainProvider } from "@/components/MainContext";
import Overplay from "@/components/Overplay";
import { PATHS } from "@/contants/path";
import useDebounce from "@/hooks/useDebounce";
import Footer from "@/page/Footer";
import Header from "@/page/Header";
import Nav from "@/page/Nav";
import backtotop from "@/utils/backtotop";
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    () => setIsNavbar(false);
    backtotop();
  }, [pathname]);
  return (
    <MainProvider>
      <Header />
      <Outlet />
      <Footer />
      <AuthenModal />
      <Overplay />
      <Nav />
      <BackToTop />
    </MainProvider>
  );
};

export default MainLayout;

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timeLoading = setTimeout(() => {
      setLoading(false);
    }, 1000);
    () => setIsNavbar(false);
    backtotop();
    return () => {
      clearTimeout(timeLoading);
    };
  }, [pathname]);
  return (
    <MainProvider>
      {/* <LoadingPage loadingPage={loading} /> */}
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

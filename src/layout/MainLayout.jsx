import BackToTop from "@/components/BackToTop";
import LoadingPage from "@/components/LoadingPage";
import { MainProvider } from "@/components/MainContext";
import Overplay from "@/components/Overplay";
import Footer from "@/page/Footer";
import Header from "@/page/Header";
import Nav from "@/page/Nav";
import backtotop from "@/utils/backtotop";
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();
  const loadingRef = useRef(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const onLoading = () => {
    setLoadingPage(true);
  };
  useEffect(() => {
    onLoading();
    const time = setTimeout(() => {
      setLoadingPage(false);
    }, 500);
    backtotop();
    return () => {
      clearTimeout(time);
    };
  }, [pathname]);
  return (
    <MainProvider>
      <LoadingPage loadingPage={loadingPage} />
      <Header />
      <Outlet />
      <Footer />
      <Overplay />
      <Nav />
      <BackToTop />
    </MainProvider>
  );
};

export default MainLayout;

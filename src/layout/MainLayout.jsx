import BackToTop from "@/components/BackToTop";
import { MainProvider } from "@/components/MainContext";
import Overplay from "@/components/Overplay";
import Footer from "@/page/Footer";
import Header from "@/page/Header";
import Nav from "@/page/Nav";
import backtotop from "@/utils/backtotop";
import React, { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    backtotop();
  }, [pathname]);
  return (
    <MainProvider>
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

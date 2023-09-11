import { MainProvider } from "@/components/MainContext";
import Overplay from "@/components/Overplay";
import Footer from "@/page/Footer";
import Header from "@/page/Header";
import Nav from "@/page/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <MainProvider>
      <Header />
      <Outlet />
      <Footer />
      <Overplay />
      <Nav />
    </MainProvider>
  );
};

export default MainLayout;

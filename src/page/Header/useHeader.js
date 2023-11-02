import { useMainContext } from "@/components/MainContext";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useHeader = () => {
  const { categories } = useSelector((state) => state.product);
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
    "/assets/img/product-6.jpg",
    "/assets/img/product-7.jpg",
    "/assets/img/product-8.jpg",
    "/assets/img/product-9.jpg",
    "/assets/img/product-10.jpg",
    "/assets/img/product-10.jpg",
  ];
  const dispatch = useDispatch();
  const { isNavbar, onToggleNav, onAuthenModal, onActiveLinkTab, onLogout } =
    useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const headerProps = {
    profile,
    isNavbar,
    onToggleNav,
    onAuthenModal,
    onActiveLinkTab,
    images,
    onLogout,
    categories,
  };
  return { headerProps };
};

export default useHeader;

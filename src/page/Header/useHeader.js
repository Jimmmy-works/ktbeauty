import { useMainContext } from "@/components/MainContext";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useHeader = () => {
  const { categories } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { isNavbar, onToggleNav, onAuthenModal, onActiveLinkTab, onLogout } =
    useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);
  const headerProps = {
    profile,
    isNavbar,
    onToggleNav,
    onAuthenModal,
    onActiveLinkTab,
    onLogout,
    categories,
    cartInfo,
  };
  return { headerProps };
};

export default useHeader;

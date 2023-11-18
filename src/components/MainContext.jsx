import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import authService from "@/service/authService";
import { authActions, register, signin } from "@/store/reducer/authReducer";
import { cartActions, getCart, updateCart } from "@/store/reducer/cartReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import React, { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MainContext = createContext({});
export const MainProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { updateStatusRegister, updateStatusLogin } = useSelector(
    (state) => state.auth
  );
  const { cartInfo } = useSelector((state) => state.cart);
  const [darkMode, setDarkMode] = useState(true);
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }
  ///// Nav + Filter Nav
  const [isNavbar, setIsNavbar] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [dropDownNav, setdropDownNav] = useState(false);
  const [controlSubNav, setControlSubNav] = useState("");
  const html = document.querySelector("html");
  const navigate = useNavigate();
  const onToggleNav = () => {
    setIsNavbar(!isNavbar);
    if (isNavbar) {
      setdropDownNav(false);
      html.setAttribute("style", "overflow-y : scroll");
    } else {
      html.setAttribute("style", "overflow-y: hidden ");
    }
  };
  const onToggleFilter = () => {
    setIsFilter(!isFilter);
  };
  const onShowSubNav = (id) => {
    setControlSubNav(id);
    setdropDownNav(true);
  };
  const onCloseSubNav = () => {
    setControlSubNav("");
    setdropDownNav(false);
  };
  /////// Authen
  const [isAuthenModal, setIsAuthenModal] = useState(false);
  const [controlAuthen, setControlAuthen] = useState("");
  const onAuthenModal = (form) => {
    setIsAuthenModal(!isAuthenModal);
    setControlAuthen(form);
  };
  const onLogin = async (payload) => {
    try {
      const res = await dispatch(signin(payload));
      if (res.meta.requestStatus === THUNK_STATUS.fulfilled) {
        setIsAuthenModal(false);
        setControlAuthen("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onLogout = async () => {
    try {
      if (Object.values(cartInfo).length !== 0) {
        const resUpdateCart = await dispatch(updateCart({ ...cartInfo }));
        if (resUpdateCart?.payload?.status === 200) {
          dispatch(cartActions.setCartInfo(null));
          dispatch(authActions.logout());
        }
      } else {
        dispatch(cartActions.setCartInfo(null));
        dispatch(authActions.logout());
      }
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  const onRegister = async (payload) => {
    try {
      const res = await dispatch(register(payload));
      if (
        updateStatusRegister !== THUNK_STATUS.pending &&
        updateStatusRegister === res.meta.requestStatus &&
        updateStatusRegister !== THUNK_STATUS.rejected
      ) {
        setIsAuthenModal(false);
        setControlAuthen("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onOpenLogin = () => {
    setControlAuthen("login");
  };
  const onOpenRegister = () => {
    setControlAuthen("register");
  };
  ///// Profile Active Tab
  const [activeLinkTab, setActiveLinkTab] = useState("");
  const onActiveLinkTab = (link) => {
    setActiveLinkTab(link);
  };
  ///// Modal Antd
  return (
    <MainContext.Provider
      value={{
        ///// Nav + Filter Nav
        isNavbar,
        onToggleNav,
        setIsNavbar,
        onToggleFilter,
        setIsFilter,
        isFilter,
        dropDownNav,
        controlSubNav,
        onShowSubNav,
        onCloseSubNav,
        html,
        /// Authen
        onLogin,
        onLogout,
        onOpenLogin,
        onOpenRegister,
        onAuthenModal,
        isAuthenModal,
        setIsAuthenModal,
        controlAuthen,
        onRegister,
        updateStatusRegister,
        updateStatusLogin,
        //Profile Active Tab
        activeLinkTab,
        setActiveLinkTab,
        onActiveLinkTab,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export const useMainContext = () => useContext(MainContext);

import { PATHS } from "@/contants/path";
import React, { createContext, useContext, useState } from "react";
const MainContext = createContext({});
export const MainProvider = ({ children }) => {
  ///// Nav + Filter Nav
  const [isNavbar, setIsNavbar] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const onToggleNav = () => {
    setIsNavbar(!isNavbar);
  };
  const onToggleFilter = () => {
    setIsFilter(!isFilter);
  };
  /////// Authen
  const [isAuthenModal, setIsAuthenModal] = useState(false);
  const [controlAuthen, setControlAuthen] = useState("");
  const onAuthenModal = (form) => {
    setIsAuthenModal(!isAuthenModal);
    setControlAuthen(form);
  };
  const onLogin = () => {
    setControlAuthen("login");
  };
  const onRegister = () => {
    setControlAuthen("register");
  };
  ///// Profile Active Tab
  const [activeLinkTab, setActiveLinkTab] = useState("");
  const onActiveLinkTab = (link) => {
    setActiveLinkTab(link);
  };

  return (
    <MainContext.Provider
      value={{
        isNavbar,
        onToggleNav,
        setIsNavbar,
        onToggleFilter,
        setIsFilter,
        isFilter,
        onLogin,
        onRegister,
        onAuthenModal,
        isAuthenModal,
        setIsAuthenModal,
        controlAuthen,
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

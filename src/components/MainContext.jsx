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
  const [headerActiveTab, setHeaderActiveTab] = useState(0);
  const onHeaderActiveTab = (index) => {
    console.log("index", index);
    setHeaderActiveTab(index);
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
        headerActiveTab,
        setHeaderActiveTab,
        onHeaderActiveTab,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export const useMainContext = () => useContext(MainContext);

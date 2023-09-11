import React, { createContext, useContext, useState } from "react";
const MainContext = createContext({});
export const MainProvider = ({ children }) => {
  const [isNavbar, setIsNavbar] = useState(false);
  const onToggleNav = () => {
    setIsNavbar(!isNavbar);
  };
  return (
    <MainContext.Provider value={{ isNavbar, onToggleNav, setIsNavbar }}>
      {children}
    </MainContext.Provider>
  );
};
export const useMainContext = () => useContext(MainContext);

import React, { createContext, useContext, useState } from "react";
const MainContext = createContext({});
export const MainProvider = ({ children }) => {
  const [isNavbar, setIsNavbar] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const onToggleNav = () => {
    setIsNavbar(!isNavbar);
  };
  const onToggleFilter = () => {
    setIsFilter(!isFilter);
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export const useMainContext = () => useContext(MainContext);

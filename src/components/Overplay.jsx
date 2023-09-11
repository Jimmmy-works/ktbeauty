import React from "react";
import { useMainContext } from "./MainContext";

const Overplay = () => {
  const { isNavbar, onToggleNav } = useMainContext();
  return (
    <div
      onClick={onToggleNav}
      className={`overplay h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.94)]
     ${
       isNavbar === true ? "visible opacity-100" : "invisible opacity-0"
     } transition-all duration-300`}
    ></div>
  );
};

export default Overplay;

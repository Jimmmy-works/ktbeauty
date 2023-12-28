import React from "react";
import { useMainContext } from "./MainContext";
import WrapperPortal from "./WrapperPortal";

const Overplay = ({ className }) => {
  const { isNavbar, onToggleNav } = useMainContext();
  return (
    <div
      onClick={onToggleNav}
      className={` overplay h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.44)]
       ${
         isNavbar === true ? "visible opacity-100" : "invisible opacity-0"
       } transition-all duration-300 z-[1000] ${className}`}
    ></div>
  );
};

export default Overplay;

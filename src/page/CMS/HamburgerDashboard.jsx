import useWindowSize from "@/utils/windowResize";
import React from "react";

const HamburgerDashboard = ({ isNavbar, onToggleNav }) => {
  const { width } = useWindowSize();
  return (
    <div
      className={`${
        width >= 768 ? "hamburger" : "hamburger-mobile"
      }  lg:hidden xs:block ${isNavbar ? "active" : "not-active"} `}
      onClick={onToggleNav}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerDashboard;

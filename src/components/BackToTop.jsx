import backtotop from "@/utils/backtotop";
import React from "react";

const BackToTop = () => {
  return (
    <div
      className="fixed bottom-[70px] right-[50px] bg-white p-[10px]  font-osl text-[24px]
      leading-[24px] text-primary rounded-[50px] rotate-[-90deg] cursor-pointer duration-400 transition-colors
      hover:bg-primary hover:text-white border-solid border border-primary"
      onClick={backtotop}
    >
      &#10140;
    </div>
  );
};

export default BackToTop;

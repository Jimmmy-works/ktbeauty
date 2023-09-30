import { PATHS } from "@/contants/path";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const HeaderCMS = () => {
  const { pathname } = useLocation();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(pathname);
  }, [pathname]);
  return (
    <div className="flex items-center justify-end relative">
      <h3 className="font-mab text-lg text-black-555 center-absolute">
        {path === "/cms" && "User"}
        {path === "/cms/product" && "Product"}
      </h3>
      <div className="flex justify-end items-center gap-2 w-fit  cursor-pointer mr-[20px]">
        <a className="block w-[50px] h-[50px]">
          <img src="/assets/img/avartar.png" alt="" />
        </a>
        <h2 className=" text-sm font-mam text-black-555">Jimmy</h2>
      </div>
    </div>
  );
};

export default HeaderCMS;

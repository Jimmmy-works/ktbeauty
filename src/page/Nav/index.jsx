import { useMainContext } from "@/components/MainContext";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const { isNavbar, onToggleNav, setIsNavbar } = useMainContext();
  const [dropDown, setDropDown] = useState(false);
  const [controlSubNav, setControlSubNav] = useState("");
  const { width } = useWindowSize();
  useEffect(() => {
    if (width > 1024) setIsNavbar(false);
  }, [width]);
  const onDropDown = (e) => {
    let target = e.target;
    if (target?.getAttribute("id")) {
      setControlSubNav(target?.getAttribute("id"));
      setDropDown(!dropDown);
    } else {
    }
  };
  return (
    <nav
      className={`nav  ${
        isNavbar ? "translate-x-0" : "-translate-x-[100%]"
      } duration-300  transition-transform`}
    >
      <div className="nav__inner">
        <ul className="nav__inner-list">
          <div className="group/hover search xs:flex md:hidden items-center xs:gap-2 xs:py-[10px] md:py-[16px]  pr-[10px]">
            <input
              type="text"
              className="bg-white border-black-be border font-mam text-black-555 text-sm duration-500 transition-all 
                  w-full xs:h-[26px] md:h-[36px] pl-[10px]  rounded-lg "
            />
            <button type="submit">
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
                />
              </svg>
            </button>
          </div>
          <li className="item">
            <Link to={PATHS.HOME}>HOME</Link>
          </li>
          <li className="item w-full relative">
            <div className="item__wrap" onClick={onDropDown} id="blog-sub">
              <Link
                className={` ${
                  dropDown && controlSubNav === "blog-sub"
                    ? "text-primary"
                    : "text-white"
                }`}
                to={PATHS.BLOG.INDEX}
              >
                BLOG
              </Link>
              <div
                className={`arrow-down ${
                  dropDown && controlSubNav === "blog-sub"
                    ? "rotate-[180deg]"
                    : "rotate-0"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors ${
                      dropDown && controlSubNav === "blog-sub"
                        ? "fill-primary"
                        : "fill-white"
                    }`}
                    fill="#fff"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className={`item__sub ${
                dropDown && controlSubNav === "blog-sub"
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <ul className="item__sub-list scrollbar-nav">
                {Array(5)
                  ?.fill("")
                  ?.map((item, index) => {
                    return (
                      <li key={`${item}${index}`}>
                        <Link to={PATHS.BLOG.INDEX}>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Lorem ipsum dolor sit, amet consectetur
                          adipisicing elit.
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
          <li className="item w-full relative" onClick={onDropDown}>
            <div className="item__wrap" id="shop-sub">
              <Link
                className={` ${
                  dropDown && controlSubNav === "shop-sub"
                    ? "text-primary"
                    : "text-white"
                }`}
                to={PATHS.SHOP.INDEX}
              >
                SHOP
              </Link>
              <div
                className={`arrow-down ${
                  dropDown && controlSubNav === "shop-sub"
                    ? "rotate-[180deg]"
                    : "rotate-0"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors ${
                      dropDown && controlSubNav === "shop-sub"
                        ? "fill-primary"
                        : "fill-white"
                    }`}
                    fill="#fff"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className={`item__sub ${
                dropDown && controlSubNav === "shop-sub"
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <ul className="item__sub-list scrollbar-nav">
                {Array(5)
                  ?.fill("")
                  ?.map((item, index) => {
                    return (
                      <li key={`${item}${index}`}>
                        <Link to={PATHS.SHOP.DETAIL}>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Lorem ipsum dolor sit, amet consectetur
                          adipisicing elit.
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
          <li className="item">
            <Link to={PATHS.ABOUT}>ABOUT US</Link>
          </li>
          <li className="item">
            <Link to={PATHS.CONTACT}>CONTACT US</Link>
          </li>
          <div className=" md:hidden xs:flex items-center gap-5 xs:py-[12px] md:py-[16px]">
            <a className="profile group/hover relative">
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24">
                <path
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  fill="#fff"
                  d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                />
              </svg>
            </a>
            <a className="whitelist group/hover">
              <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                <path
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  fill="#fff "
                  d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
                />
              </svg>
            </a>
            <a className="cart group/hover mb-[2px] relative">
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24">
                <path
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  fill="#fff"
                  d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"
                />
              </svg>
            </a>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

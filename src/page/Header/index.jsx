import { useMainContext } from "@/components/MainContext";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";

const Header = () => {
  const { isNavbar, onToggleNav } = useMainContext();
  return (
    <header className="header">
      <div className="container h-full flex items-center justify-between">
        <Link to={`${PATHS.HOME}`} className="header__logo   ">
          <img src="assets/img/logo-1.svg" alt="" />
        </Link>
        <div
          className={`hamburger lg:hidden xs:block ${
            isNavbar ? "active" : "not-active"
          }`}
          onClick={onToggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="header__menu xs:hidden lg:flex">
          <li className="header__menu-item ">
            <Link to={`${PATHS.HOME}`}> HOME</Link>
          </li>
          <li className="header__menu-item relative ">
            <Link to={`${PATHS.SHOP.INDEX}`}>
              SHOP
              <div className="arrow-down">
                <svg
                  className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
              <ul className="sub">
                {Array(5)
                  .fill("")
                  .map((item, index) => (
                    <li key={`${item}${index}`} className="sub__item ">
                      <a className="" href="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </a>
                    </li>
                  ))}
              </ul>
            </Link>
          </li>
          <li className="header__menu-item relative">
            <Link to={`${PATHS.BLOG.INDEX}`}>
              BLOG
              <div className="arrow-down">
                <svg
                  className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
            </Link>
            <ul className="sub">
              {Array(5)
                .fill("")
                .map((item, index) => (
                  <li key={`${item}${index}`} className="sub__item ">
                    <a href="#">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dignissimos quod numquam voluptate!
                    </a>
                  </li>
                ))}
            </ul>
          </li>
          <li className="header__menu-item ">
            <Link to={`${PATHS.ABOUT}`}> ABOUT</Link>
          </li>
          <li className="header__menu-item ">
            <Link to={`${PATHS.CONTACT}`}> CONTACT</Link>
          </li>
        </ul>
        <div className="header__info xs:hidden md:flex h-full items-center">
          <form
            action=""
            className="group/input group/hover header__info-search md:hidden lg:flex"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                fill="#555"
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
              />
            </svg>
            <input
              type="text"
              className="bg-white border-black-be border font-mam text-black-555 text-sm duration-500 transition-all 
              w-[220px] h-[34px] pl-[10px]  rounded-lg  absolute right-[40px] top-1/2 -translate-y-1/2
              group-hover/input:visible group-hover/input:opacity-100 invisible opacity-0"
            />
          </form>
          <div className="header__info-profile group/hover relative">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555"
                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
              />
            </svg>
            <ul className="sub p-0 border border-[#e5e7eb] border-solid">
              <li
                className="sub__item min-w-[120px] border-b border-[#e5e7eb] 
              border-solid p-[10px] justify-between group/sub "
              >
                <a className="" href="">
                  Login
                </a>
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                  <path
                    fill="#555"
                    className="group-hover/sub:fill-primary"
                    d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"
                  />
                </svg>
              </li>
              <li
                className=" sub__item min-w-[120px] p-[10px] justify-between
              group/sub"
              >
                <a className="" href="">
                  Register
                </a>
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                  <path
                    className="group-hover/sub:fill-primary"
                    fill="#555"
                    d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"
                  />
                </svg>
              </li>
            </ul>
          </div>
          <div className="header__info-whitelist group/hover mb-[2px] relative">
            <span
              className="text-[13px] text-white font-mam rounded-[50%] bg-primary h-[20px] w-[20px]
            flex items-center justify-center absolute right-[3px] top-[42%] -translate-y-1/2"
            >
              3
            </span>
            <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555 "
                d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
              />
            </svg>

            <ul
              className="absolute top-[150%] md:-right-[30%] lg:-right-[100%] border border-[#e5e7eb] border-solid
             p-[20px_10px_10px]  invisible opacity-0 group-hover/hover:visible group-hover/hover:opacity-100
              group-hover/hover:top-[calc(100%+1px)] transition-all duration-400 shadow-header bg-white"
            >
              <h3 className="font-mab text-md text-black-555 p-[10px]">
                (3) White list
              </h3>
              <ul className="flex flex-col min-w-max max-h-[390px] overflow-y-scroll scrollbar-cart pr-[10px]">
                {Array(10)
                  .fill("")
                  .map((item, index) => (
                    <li
                      key={`${item}${index}`}
                      className="flex items-center w-full gap-3 max-w-[280px] py-[10px]"
                    >
                      <a
                        href=""
                        className="relative block min-h-[100px] min-w-[100px] "
                      >
                        <img
                          className="center-absolute hover:scale-105 transition-transform duration-300"
                          src="/assets/img/product-4.jpg"
                          alt=""
                        />
                      </a>
                      <div>
                        <a
                          className="text-[16px] text-black-555 font-mar font-semibold truncate line-clamp-2 
                       whitespace-normal hover:text-primary transition-colors duration-400"
                          href=""
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ipsa, nihil.
                        </a>
                        <p className="font-mar font-bold text-[15px] text-primary mt-[14px]">
                          $300
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="mt-[15px] flex items-center justify-center">
                <Button variant="filled" className={`w-full`}>
                  VIEW MY WHITE LIST
                </Button>
              </div>
            </ul>
          </div>
          <div className="header__info-cart group/hover mb-[2px] relative">
            <span
              className="text-[13px] text-white font-mam rounded-[50%] bg-primary h-[20px] w-[20px]
            flex items-center justify-center absolute right-[3px] top-[42%] -translate-y-1/2"
            >
              3
            </span>
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555"
                d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"
              />
            </svg>
            <ul
              className="absolute top-[150%] md:-right-[30%] lg:-right-[100%] border border-[#e5e7eb] border-solid
             p-[20px_10px_10px]  invisible opacity-0 group-hover/hover:visible group-hover/hover:opacity-100
              group-hover/hover:top-[calc(100%+1px)] transition-all duration-400 shadow-header bg-white"
            >
              <h3 className="font-mab text-md text-black-555 p-[10px]">
                (5) Item in my cart
              </h3>
              <ul className="flex flex-col min-w-max max-h-[390px] overflow-y-scroll scrollbar-cart pr-[10px]">
                {Array(10)
                  .fill("")
                  .map((item, index) => (
                    <li
                      key={`${item}${index}`}
                      className="flex items-center w-full gap-3 max-w-[280px] py-[10px]"
                    >
                      <a
                        href=""
                        className="relative block min-h-[100px] min-w-[100px] "
                      >
                        <img
                          className="center-absolute hover:scale-105 transition-transform duration-300"
                          src="/assets/img/product-4.jpg"
                          alt=""
                        />
                      </a>
                      <div>
                        <a
                          className="text-[16px] text-black-555 font-mar font-semibold truncate line-clamp-2 
                      whitespace-normal hover:text-primary transition-colors duration-400"
                          href=""
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ipsa, nihil.
                        </a>
                        <p className="font-mar font-bold  text-[15px] text-primary mt-[6px]">
                          $300
                        </p>
                        <div
                          className="font-mam text-[15px] text-black-555 mt-[6px] flex items-start gap-[6px]
                        flex-col"
                        >
                          <p> Quantity: 100</p>
                          <button
                            className="px-[6px] block text-[13px] text-white rounded-md py-[3px] hover:bg-red-500
                      bg-black-333 transition-all duration-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="mt-[15px] flex items-center justify-center">
                <Button variant="filled" className={`w-full`}>
                  VIEW MY CART
                </Button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

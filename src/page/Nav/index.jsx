import { useMainContext } from "@/components/MainContext";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";

import queryString from "query-string";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();
  const { isNavbar, setIsNavbar, onAuthenModal, onLogout, onToggleNav, html } =
    useMainContext();
  const { products, categories } = useSelector((state) => state.product);
  const { profile } = useSelector((state) => state.auth);
  const { width } = useWindowSize();
  const [productListSearch, setProductListSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  /// category
  const [categoryTab, setCategoryTab] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  useEffect(() => {
    updateQueryString({
      limit: 9,
      page: 0,
      categories: categoryTab,
    });
    setIsNavbar(false);
    onToggleNav();
  }, [categoryTab]);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const handleCloseNav = () => {
    html?.setAttribute("style", "overflow-y : scroll");
    document
      ?.querySelector(`main`)
      ?.setAttribute("style", "transform: translateX(0)");
    setIsNavbar(false);
  };
  const onSearchProduct = (productName) => {
    const result = products?.find((product) => {
      return product?.name.includes(productName);
    });
    if (productName) {
      setProductListSearch(result);
    } else {
      setProductListSearch([]);
    }
  };
  useEffect(() => {
    setIsNavbar(false);
    handleCloseNav();
    setSearchTerm("");
  }, [pathname]);
  useEffect(() => {
    if (width > 1024) {
      setIsNavbar(false);
      handleCloseNav();
    }
  }, [width]);
  const [drawerControl, setDrawerControl] = useState("inner-1");
  const onChangeDrawer = (id) => {
    setDrawerControl(id);
  };
  useEffect(() => {
    const time = setTimeout(() => {
      onSearchProduct(searchTerm);
    }, 500);
    return () => clearTimeout(time);
  }, [searchTerm]);
  return (
    <nav
      className={`nav  ${
        isNavbar ? "translate-x-0" : "-translate-x-[100%]"
      } duration-200  transition-transform`}
    >
      <div className="nav__inner">
        <div
          id="inner-1"
          className={`nav__inner-wrapper ${
            drawerControl ===
            document.querySelector("#inner-1")?.getAttribute("id")
              ? "is-open  transform-3d-0"
              : "is-hidden  -transform-3d-30"
          }`}
        >
          <ul className="nav__inner-list">
            <li className="nav__inner-title item">
              <a>Menu</a>
            </li>
            {/* <div
              className="group/hover search xs:flex md:hidden items-center xs:gap-2 xs:py-[10px]
                  md:py-[16px]  pr-[10px]"
            >
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="bg-white border-black-be border font-om text-black-555 text-sm duration-500 transition-all 
                    w-full xs:h-[26px] md:h-[36px] pl-[10px]  rounded-lg "
              />
              <button type="submit">
                <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24">
                  <path
                    fill="#000000BF"
                    className="group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
                  />
                </svg>
              </button>
            </div> */}
            <li className="item">
              <Link to={PATHS.HOME}>TRANG CHỦ</Link>
            </li>
            <li className="item">
              <a>SẢN PHẨM</a>
              <div
                onClick={() => onChangeDrawer("inner-2")}
                className={`arrow-down `}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`fill-[#000000BF]`}
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  />
                </svg>
              </div>
            </li>
            <li className="item" onClick={() => onChangeDrawer("inner-4")}>
              <Link to={PATHS.BLOG.INDEX}>TIN TỨC</Link>
              <div className={`arrow-down`}>
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    fill="#000000BF"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  ></path>
                </svg>
              </div>
            </li>
            <li className="item">
              <Link to={PATHS.ABOUT}>VỀ CHÚNG TÔI</Link>
            </li>
            <li className="item">
              <Link to={PATHS.CONTACT}>LIÊN HỆ</Link>
            </li>
            <li className="item">
              <Link to={PATHS.COUNSEL}>tư vấn</Link>
            </li>
            <li className="item">
              <a>Tài khoản cá nhân</a>
              <div
                onClick={() => onChangeDrawer("inner-3")}
                className={`arrow-down `}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    fill="#000000BF"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  ></path>
                </svg>
              </div>
            </li>
          </ul>
        </div>
        <div
          id="inner-2"
          className={`nav__inner-wrapper ${
            drawerControl ===
            document.querySelector("#inner-2")?.getAttribute("id")
              ? "is-open transform-3d-0"
              : "is-hidden transform-3d-nav"
          }`}
        >
          <ul className="nav__inner-list">
            <li className="nav__inner-title item ">
              <a>Categories</a>
              <div
                onClick={() => onChangeDrawer("inner-1")}
                className={`arrow-down rotate-[90deg] `}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors fill-[#000000BF]`}
                    fill="#000000BF"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  />
                </svg>
              </div>
            </li>
            {categories?.map((item) => {
              return (
                <li className="item" key={item?._id}>
                  <NavLink
                    to={PATHS.SHOP.INDEX}
                    onClick={() => setCategoryTab(item?._id)}
                  >
                    {item?.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          id="inner-3"
          className={`nav__inner-wrapper ${
            drawerControl ===
            document.querySelector("#inner-3")?.getAttribute("id")
              ? "is-open transform-3d-0"
              : "is-hidden transform-3d-nav"
          }`}
        >
          <ul className="nav__inner-list">
            <li className="nav__inner-title item ">
              <a>{!profile ? "Bạn chưa đăng nhập ?" : "Quản lí"}</a>
              <div
                onClick={() => onChangeDrawer("inner-1")}
                className={`arrow-down rotate-[90deg] `}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors fill-[#000000BF]`}
                    fill="#000000BF"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  />
                </svg>
              </div>
            </li>
            {_token ? (
              <>
                {profile?.isAdmin ? (
                  <li className="item justify-start">
                    <Link
                      className="flex gap-1 items-center"
                      to={PATHS.CMS.INDEX}
                    >
                      <svg
                        className="md:w-[22px] md:h-[22px] xs:w-[16px] xs:h-[16px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 5C11.4477 5 11 5.44772 11 6V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10V6C13 5.44772 12.5523 5 12 5Z"
                          className="fill-[#000000BF]"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4 8C4 3.58172 7.58172 0 12 0C16.4183 0 20 3.58172 20 8V16C20 20.4183 16.4183 24 12 24C7.58172 24 4 20.4183 4 16V8ZM18 8V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8Z"
                          className="fill-[#000000BF]"
                        />
                      </svg>
                      QUẢN LÍ TRANG
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="item justify-start">
                  <Link
                    className="flex gap-1 items-center"
                    to={PATHS.PROFILE.INDEX}
                  >
                    <svg
                      className="md:w-[22px] md:h-[22px] xs:w-[16px] xs:h-[16px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                        className="fill-[#000000BF]"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                        className="fill-[#000000BF]"
                      />
                    </svg>
                    cá nhân
                  </Link>
                </li>
                <li className="item justify-start">
                  <Link
                    className="flex gap-1 items-center"
                    to={PATHS.PROFILE.WHITELIST}
                  >
                    <svg
                      className="md:w-[22px] md:h-[22px] xs:w-[16px] xs:h-[16px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
                        className="fill-[#000000BF]"
                      />
                    </svg>
                    Yêu thích
                  </Link>
                </li>
                <li className="item justify-start">
                  <Link className="flex gap-1 items-center" to={PATHS.CART}>
                    <svg
                      className="md:w-[22px] md:h-[22px] xs:w-[16px] xs:h-[16px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                        className="fill-[#000000BF]"
                      />
                      <path
                        d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                        className="fill-[#000000BF]"
                      />
                      <path
                        d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                        className="fill-[#000000BF]"
                      />
                    </svg>
                    giỏ hàng
                  </Link>
                </li>
                <li className="item justify-start">
                  <a
                    className="flex gap-1 items-center text-red-600"
                    onClick={onLogout}
                  >
                    <svg
                      className=" md:w-[22px] md:h-[22px] xs:w-[16px] xs:h-[16px] "
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
                        className="fill-red-600"
                      />
                      <path
                        d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
                        className="fill-red-600"
                      />
                    </svg>
                    đăng xuất
                  </a>
                </li>
              </>
            ) : (
              <>
                <li
                  className="item justify-start"
                  onClick={() => {
                    onAuthenModal("login");
                    handleCloseNav();
                  }}
                >
                  <a className="flex gap-1 items-center ">
                    <svg
                      className="md:w-[16px] md:h-[16px] xs:w-[14px] xs:h-[14px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="fill-[#000000BF] group-hover/hover:fill-primary duration-300 transition-colors"
                        d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"
                      />
                    </svg>
                    Đăng nhập
                  </a>
                </li>
                <li
                  className="item justify-start"
                  onClick={() => {
                    onAuthenModal("register");
                    handleCloseNav();
                  }}
                >
                  <a className="flex gap-1 items-center  ">
                    <svg
                      className="md:w-[16px] md:h-[16px] xs:w-[14px] xs:h-[14px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="fill-[#000000BF] group-hover/hover:fill-primary duration-300 transition-colors"
                        d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"
                      ></path>
                    </svg>
                    Đăng kí
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div
          id="inner-4"
          className={`nav__inner-wrapper ${
            drawerControl ===
            document.querySelector("#inner-4")?.getAttribute("id")
              ? "is-open transform-3d-0"
              : "is-hidden transform-3d-nav"
          }`}
        >
          <ul className="nav__inner-list">
            <li className="nav__inner-title item ">
              <a>Nổi bật</a>
              <div
                onClick={() => onChangeDrawer("inner-1")}
                className={`arrow-down rotate-[90deg] `}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors fill-[#000000BF]`}
                    fill="#000000BF"
                    d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"
                  />
                </svg>
              </div>
            </li>
            <li className="item">
              <a>Bí quyết skincare</a>
            </li>
            <li className="item">
              <a>Ưu đãi</a>
            </li>
            <li className="item">
              <a>Tuyển dụng</a>
            </li>
            <li className="item">
              <a>Chính sách thành viên</a>
            </li>
            <li className="item">
              <a>Khám pha</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

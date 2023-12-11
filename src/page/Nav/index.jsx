import { useMainContext } from "@/components/MainContext";
import { NAV_OPTION } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useLocation, useSearchParams } from "react-router-dom";
import useHeader from "../Header/useHeader";
import queryString from "query-string";

const Nav = () => {
  const { pathname } = useLocation();
  const {
    isNavbar,
    setIsNavbar,
    dropDownNav,
    controlSubNav,
    onShowSubNav,
    onCloseSubNav,
    onAuthenModal,
    onLogout,
    onToggleNav,
  } = useMainContext();
  const { onChangeCategory } = useHeader();
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
  const onChangeParamCategory = (category) => {
    setCategoryTab(category);
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
  const onDropDown = (id) => {
    onShowSubNav((prev) => (prev === id ? "" : id));
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
    onCloseSubNav();
    setSearchTerm("");
  }, [pathname]);
  useEffect(() => {
    if (width > 1024) {
      setIsNavbar(false);
      onCloseSubNav();
    }
  }, [width]);
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
        <ul className="nav__inner-list">
          <div
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
          <li
            className="item relative"
            onClick={() => onDropDown(NAV_OPTION.BLOG)}
          >
            <div className="item__wrap has-sub">
              <Link
                className={` ${
                  dropDownNav && controlSubNav === NAV_OPTION.BLOG
                    ? "text-primary"
                    : "text-white"
                }`}
                to={PATHS.BLOG.INDEX}
              >
                BLOG
              </Link>
              <div
                className={`arrow-down ${
                  dropDownNav && controlSubNav === NAV_OPTION.BLOG
                    ? "rotate-[-90deg]"
                    : "rotate-0"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors ${
                      dropDownNav && controlSubNav === NAV_OPTION.BLOG
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
                dropDownNav && controlSubNav === NAV_OPTION.BLOG
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
                        <NavLink to={PATHS.BLOG.INDEX}>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Lorem ipsum dolor sit, amet consectetur
                          adipisicing elit.
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
          <li
            className="item  relative"
            onClick={() => onDropDown(NAV_OPTION.SHOP)}
          >
            <div className="item__wrap has-sub">
              <Link
                className={` ${
                  dropDownNav && controlSubNav === NAV_OPTION.SHOP
                    ? "text-primary"
                    : "text-white"
                }`}
                to={PATHS.SHOP.INDEX}
              >
                SHOP
              </Link>
              <div
                className={`arrow-down ${
                  dropDownNav && controlSubNav === NAV_OPTION.SHOP
                    ? "rotate-[-90deg]"
                    : "rotate-0"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 1024 1024">
                  <path
                    className={`duration-400 transition-colors ${
                      dropDownNav && controlSubNav === NAV_OPTION.SHOP
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
                dropDownNav && controlSubNav === NAV_OPTION.SHOP
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <ul className="item__sub-list scrollbar-nav min-w-[120px]">
                {categories?.length
                  ? categories?.map((cate) => (
                      <li key={`${cate?._id}`} className="capitalize">
                        <Link
                          className="w-full"
                          onClick={() => onChangeParamCategory(cate?._id)}
                          to={PATHS.SHOP.INDEX}
                        >
                          {cate?.name}
                        </Link>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </li>
          <li className="item">
            <Link to={PATHS.ABOUT}>ABOUT US</Link>
          </li>
          <li className="item">
            <Link to={PATHS.CONTACT}>CONTACT US</Link>
          </li>
          {_token ? (
            <div className=" md:hidden xs:flex flex-col items-start justify-start ">
              {profile?.isAdmin ? (
                <Link
                  to={PATHS.CMS.INDEX}
                  className="w-full group/hover relative flex items-center gap-[10px] xs:py-[12px] md:py-[16px]"
                >
                  <svg
                    className="md:w-[20px] md:h-[20px] xs:w-[16px] xs:h-[16px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                      d="M7 16.488l1.526-.723c1.792-.81 2.851-.344 4.349.232 1.716.661 2.365.883 3.077 1.164 1.278.506.688 2.177-.592 1.838-.778-.206-2.812-.795-3.38-.931-.64-.154-.93.602-.323.818 1.106.393 2.663.79 3.494 1.007.831.218 1.295-.145 1.881-.611.906-.72 2.968-2.909 2.968-2.909.842-.799 1.991-.135 1.991.72 0 .23-.083.474-.276.707-2.328 2.793-3.06 3.642-4.568 5.226-.623.655-1.342.974-2.204.974-.442 0-.922-.084-1.443-.25-1.825-.581-4.172-1.313-6.5-1.6v-5.662zm-1 6.538h-4v-8h4v8zm1-7.869v-1.714c-.006-1.557.062-2.447 1.854-2.861 1.963-.453 4.315-.859 3.384-2.577-2.761-5.092-.787-7.979 2.177-7.979 2.907 0 4.93 2.78 2.177 7.979-.904 1.708 1.378 2.114 3.384 2.577 1.799.415 1.859 1.311 1.853 2.879 0 .13-.011 1.171 0 1.665-.483-.309-1.442-.552-2.187.106-.535.472-.568.504-1.783 1.629-1.75-.831-4.456-1.883-6.214-2.478-.896-.304-2.04-.308-2.962.075l-1.683.699z"
                    />
                  </svg>
                  <p className="text-white font-om text-sm uppercase">
                    Quản lí trang
                  </p>
                </Link>
              ) : (
                ""
              )}
              <Link
                to={PATHS.PROFILE.INDEX}
                className="profile w-full group/hover relative flex items-center gap-[10px] xs:py-[12px] md:py-[16px]"
              >
                <svg
                  className="md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px]"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                  />
                </svg>
                <p className="text-white font-om text-sm uppercase">Cá nhân</p>
              </Link>
              <a className="whitelist w-full group/hover relative flex items-center gap-[10px] xs:py-[12px] md:py-[16px]">
                <svg
                  className="md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px] "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
                  />
                </svg>
                <p className="text-white font-om text-sm uppercase">
                  Yêu thích
                </p>
              </a>
              <Link
                to={PATHS.CART}
                className="cart group/hover w-full flex items-center gap-[10px] mb-[2px] relative xs:py-[12px] md:py-[16px]"
              >
                <svg
                  className="md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px]"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"
                  />
                </svg>

                <p className="text-white font-om text-sm uppercase">Giỏ hàng</p>
              </Link>
              <a
                onClick={onLogout}
                className="cart group/hover w-full flex items-center gap-[10px] mb-[2px] relative xs:py-[12px] md:py-[16px]"
              >
                <svg
                  className=" md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px] "
                  viewBox="0 0 256 256"
                >
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M14.7,12.7c-1.6,0.8-2.8,1.9-3.5,3.3L10,18.1v89.8c0,86.9,0.1,89.9,1,92c0.7,1.5,1.7,2.6,3.3,3.4c59.2,33.5,72,40.6,73.4,40.9c2.5,0.5,6.1-1,7.8-3.3l1.4-1.8l0.2-17.1l0.2-17.1l34.8-0.2c34-0.2,34.9-0.2,36.7-1.3c1-0.6,2.4-1.8,3-2.8l1.2-1.7v-28.4v-28.4h-8.1h-8.1v23v23H127H97.2l-0.1-65.7L97,56.7L95.6,55c-0.9-1.2-7.6-5.3-22.5-13.7c-11.6-6.6-21.5-12.2-21.9-12.5c-0.5-0.3,20.2-0.5,52.4-0.5h53.1v29.5v29.5h8.1h8.1V52.4V17.5l-1.1-1.7c-0.7-0.9-1.9-2.2-2.7-2.8l-1.5-1.1l-75.3-0.2L17,11.6L14.7,12.7z"
                  />
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M191.9,78.1l-1.5,1.3l-0.2,11.8l-0.2,11.8h-22c-13.1,0-23,0.3-24.4,0.6c-5.5,1.3-9.1,5.7-9.1,11.2c0.1,4.7,2.1,8.1,6.3,10.3c2,1.1,2.7,1.1,25.7,1.3l23.6,0.2l0.2,11.7l0.2,11.8l1.8,1.6c1.5,1.3,2.1,1.5,3.5,1.3c2.1-0.4,48.7-33.9,49.8-36c0.5-1,0.6-1.8,0.3-3.3c-0.5-1.8-2-3-24.5-19.4c-21.4-15.5-24.2-17.4-26-17.4C194,76.9,192.9,77.3,191.9,78.1z"
                  />
                </svg>
                <p className="text-white font-om text-sm uppercase">
                  Đăng xuất
                </p>
              </a>
            </div>
          ) : (
            <div className=" md:hidden xs:flex flex-col items-start justify-start ">
              <a
                onClick={() => onAuthenModal("login")}
                className="cart group/hover w-full flex items-center gap-[10px] mb-[2px] relative xs:py-[12px] md:py-[16px]"
              >
                <svg
                  className="md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px]"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"
                  />
                </svg>
                <p className="text-white font-om text-sm uppercase">
                  Đăng nhập
                </p>
              </a>
              <a
                onClick={() => onAuthenModal("register")}
                className="cart group/hover w-full flex items-center gap-[10px] mb-[2px] relative xs:py-[12px] md:py-[16px]"
              >
                <svg
                  className="md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px]"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white group-hover/hover:fill-primary duration-300 transition-colors"
                    d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"
                  ></path>
                </svg>
                <p className="text-white font-om text-sm uppercase">Đăng kí</p>
              </a>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

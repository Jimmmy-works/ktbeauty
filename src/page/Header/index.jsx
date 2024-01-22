import QuantityInput from "@/assets/Input/QuantityInput";
import Button from "@/components/Button";
import Hamburger from "@/components/Hamburger";
import { useMainParamContext } from "@/components/MainParamShopContext";
import {
  OPTION_LIFE_STYLE,
  OPTION_SEX,
  OPTION_SKIN_TYPE,
  _LIMIT,
} from "@/contants/general";
import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { formatPriceVND } from "@/utils/formatPrice";
import { Drawer, Empty } from "antd";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useHeader from "./useHeader";
const EmptyWrapper = styled.div`
  margin-bottom: 12px;
  min-width: 200px;
  .ant-empty-description {
    font-family: "OpenSans-SemiBold";
    font-size: 14px;
  }
  .ant-empty-image {
    svg {
      width: 100px !important;
      height: 100px !important;
    }
  }
`;
const TextChangeColor = styled.span`
  .waviy {
    position: relative;
    -webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    font-size: 60px;
  }
  .waviy span {
    font-family: "Alfa Slab One", cursive;
    position: relative;
    display: inline-block;
    color: #fff;
    text-transform: uppercase;
    animation: waviy 1s infinite;
    animation-delay: calc(0.1s * var(--i));
  }
  @keyframes waviy {
    0%,
    40%,
    100% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(-20px);
    }
  }
  .animate-charcter {
    text-transform: uppercase;
    background-image: linear-gradient(
      -225deg,
      #231557 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 2s linear infinite;
    display: inline-block;
  }

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
  @keyframes Color {
    0% {
      background-color: #a0d468;
    }

    20% {
      background-color: #4fc1e9;
    }

    40% {
      background-color: #ffce54;
    }

    60% {
      background-color: #fc6e51;
    }

    80% {
      background-color: #ed5565;
    }

    100% {
      background-color: #ac92ec;
    }
  }
  @-moz-keyframes Color {
    0% {
      background-color: #a0d468;
    }

    20% {
      background-color: #4fc1e9;
    }

    40% {
      background-color: #ffce54;
    }

    60% {
      background-color: #fc6e51;
    }

    80% {
      background-color: #ed5565;
    }

    100% {
      background-color: #ac92ec;
    }
  }

  @-webkit-keyframes Color {
    0% {
      background-color: #a0d468;
    }

    20% {
      background-color: #4fc1e9;
    }

    40% {
      background-color: #ffce54;
    }

    60% {
      background-color: #fc6e51;
    }

    80% {
      background-color: #ed5565;
    }

    100% {
      background-color: #ac92ec;
    }
  }
`;
const Header = () => {
  const {
    valueChecked,
    renderChecked,
    onChangeCheckbox,
    onChangeRenderCheckbox,
    setValueChecked,
    setRenderChecked,
    //////
    valueCheckedSex,
    renderCheckedSex,
    setValueCheckedSex,
    setRenderCheckedSex,
    onChangeCheckboxSex,
    onChangeRenderCheckboxSex,
    /////
    valueCheckedLifeStyle,
    renderCheckedLifeStyle,
    setValueCheckedLifeStyle,
    setRenderCheckedLifeStyle,
    onChangeCheckboxLifeStyle,
    onChangeRenderCheckboxLifeStyle,
    ////
    valueCheckedSkinType,
    renderCheckedSkinType,
    setValueCheckedSkinType,
    setRenderCheckedSkinType,
    onChangeCheckboxSkinType,
    onChangeRenderCheckboxSkinType,
  } = useMainParamContext();
  const { headerProps } = useHeader();
  const {
    profile,
    isNavbar,
    onToggleNav,
    onAuthenModal,
    onActiveLinkTab,
    onLogout,
    categories,
    cartInfo,
    onDeleteProductInCart,
    onSearchProduct,
    pathname,
    productListSearch,
    // categoryTab,
    width,
    onChangeQuantity,
    ///
    updateStatusUpdateCart,
    ////whiteListInfo,
    whiteListInfo,
    statusUpdateWhiteList,
    onDeleteProductInWhiteList,
  } = headerProps || {};
  const refHeader = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const onClickSearch = () => {
    onSearchProduct(e.target.value);
  };
  const onToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };
  const categoryAll = categories
    ?.filter((cate) => cate?.name === "all")
    ?.map((item) => item?._id);
  const [open, setOpen] = useState("");
  const showDrawer = (name) => {
    document.body.setAttribute("style", "overflow-y : hidden");
    setOpen(name);
  };
  const onClose = () => {
    setOpen("");
    document.body?.setAttribute("style", "overflow-y : scroll");
  };
  const max = 20;
  const min = 1;
  useEffect(() => {
    const time = setTimeout(() => {
      onSearchProduct(searchTerm);
    }, 500);
    if (!toggleSearch) {
      setSearchTerm("");
    }
    return () => clearTimeout(time);
  }, [toggleSearch]);
  useEffect(() => {
    setSearchTerm("");
    setOpen("");
  }, [pathname]);
  const [categoryTab, setCategoryTab] = useState();
  return (
    <header className={`header`} ref={refHeader}>
      <div className="header__advertisement">
        {width > 834 ? (
          <>
            <p>Giao hàng 24h - Giảm 10% đơn 3 triệu - 20% cho đơn 5 triệu</p>
            <p>Miễn phí tư vấn da</p>
            <p>Flash Sale Upto 50% </p>
          </>
        ) : (
          <Swiper
            className="overflow-y-visible"
            modules={[Autoplay]}
            speed={600}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            freeMode
            grabCursor={true}
            pagination={false}
            loop={true}
          >
            <SwiperSlide>
              <p>Giao hàng 24h - Giảm 10% đơn 3 triệu - 20% cho đơn 5 triệu</p>
            </SwiperSlide>
            <SwiperSlide>
              <p>Miễn phí tư vấn da</p>
            </SwiperSlide>
          </Swiper>
        )}
      </div>
      <div className="header__main ">
        <NavLink to={`${PATHS.HOME}`} className={`header__logo z-[1000] `}>
          <svg className="group " viewBox="3 -40.5 215.18 41.1">
            <path
              className="fill-black-555 group-hover:fill-primary duration-400 transition-colors"
              d="M11.95 0L3 0 3-40.5 11.95-40.5 11.95-23.95 18.75-40.5 27.5-40.5 20-22.2 27.85 0 18.75 0 12.9-17.9 11.95-16.3 11.95 0ZM44 0L35 0 35-33.85 28.9-33.85 28.9-40.5 50.05-40.5 50.05-33.85 44-33.85 44 0ZM78.84 0L66.39 0 66.39-40.5 76.94-40.5Q79.54-40.5 81.87-40.1 84.19-39.7 85.99-38.58 87.79-37.45 88.82-35.38 89.84-33.3 89.84-29.9L89.84-29.9Q89.84-27.45 89.12-25.78 88.39-24.1 87.07-23.1 85.74-22.1 83.89-21.75L83.89-21.75Q86.24-21.45 87.84-20.23 89.44-19 90.27-16.95 91.09-14.9 91.09-12L91.09-12Q91.09-8.85 90.27-6.58 89.44-4.3 87.89-2.85 86.34-1.4 84.07-0.7 81.79 0 78.84 0L78.84 0ZM75.34-18.4L75.34-6.25 77.24-6.25Q80.19-6.25 81.32-7.75 82.44-9.25 82.44-12.15L82.44-12.15Q82.44-14.45 81.94-15.8 81.44-17.15 80.29-17.78 79.14-18.4 77.19-18.4L77.19-18.4 75.34-18.4ZM75.34-34.5L75.34-24.3 77.09-24.3Q79.14-24.3 80.19-24.93 81.24-25.55 81.62-26.75 81.99-27.95 81.99-29.65L81.99-29.65Q81.99-31.25 81.42-32.33 80.84-33.4 79.72-33.95 78.59-34.5 76.89-34.5L76.89-34.5 75.34-34.5ZM114.09 0L95.79 0 95.79-40.5 113.99-40.5 113.99-34.4 104.74-34.4 104.74-24.35 111.79-24.35 111.79-18.15 104.74-18.15 104.74-6.05 114.09-6.05 114.09 0ZM124.64 0L116.19 0 123.84-40.5 134.04-40.5 141.59 0 133.34 0 131.99-8.55 126.04-8.55 124.64 0ZM128.99-29.7L126.84-13.9 131.14-13.9 128.99-29.7ZM156.99 0.6L156.99 0.6Q152.34 0.6 149.71-0.93 147.09-2.45 146.04-5.38 144.99-8.3 144.99-12.55L144.99-12.55 144.99-40.5 153.84-40.5 153.84-11.2Q153.84-9.95 154.04-8.7 154.24-7.45 154.91-6.65 155.59-5.85 156.99-5.85L156.99-5.85Q158.44-5.85 159.09-6.65 159.74-7.45 159.91-8.7 160.09-9.95 160.09-11.2L160.09-11.2 160.09-40.5 168.99-40.5 168.99-12.55Q168.99-8.3 167.91-5.38 166.84-2.45 164.24-0.93 161.64 0.6 156.99 0.6ZM187.33 0L178.33 0 178.33-33.85 172.23-33.85 172.23-40.5 193.38-40.5 193.38-33.85 187.33-33.85 187.33 0ZM210.63 0L202.03 0 202.03-16.55 194.33-40.5 202.78-40.5 206.63-27.7 210.08-40.5 218.18-40.5 210.63-16.55 210.63 0Z"
            ></path>
          </svg>
          {/* <img srcSet="/assets/img/sammishop.png 10x" alt="" /> */}
        </NavLink>
        <Hamburger isNavbar={isNavbar} onToggleNav={onToggleNav} />
        <div className="header__menu">
          <ul className="mymenu">
            <li>
              <NavLink to={PATHS.HOME}>Trang chủ</NavLink>
            </li>
            <li>
              <NavLink
                to={`${
                  valueChecked?.length
                    ? `${PATHS?.SHOP.INDEX}?${queryString?.stringify({
                        categories: valueChecked?.toString(),
                        page: 0,
                        limit: _LIMIT,
                      })}`
                    : `${PATHS?.SHOP?.INDEX}`
                }`}
                onClick={() => {
                  setCategoryTab(categoryAll);
                  setValueChecked([]),
                    setRenderChecked([]),
                    setValueCheckedSex([]),
                    setRenderCheckedSex([]),
                    setValueCheckedLifeStyle([]),
                    setRenderCheckedLifeStyle([]);
                  setValueCheckedSkinType([]), setRenderCheckedSkinType([]);
                }}
              >
                Sản phẩm
                <span className="arrow-down">
                  <svg
                    className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                    viewBox="0 0 1024 1024"
                  >
                    <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                  </svg>
                </span>
              </NavLink>
              <ul className="submenu">
                <li>
                  <NavLink>Danh mục</NavLink>
                  <ul className="submenu2">
                    {categories?.map((item) => (
                      <li key={`${item?._id}`}>
                        <NavLink
                          onClick={() => {
                            setCategoryTab(item?._id),
                              setValueChecked([item?._id]);
                            setRenderChecked([item]);
                          }}
                          to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                            limit: _LIMIT,
                            page: 0,
                            categories: item?._id,
                          })}`}
                        >
                          {item?.label || "Lorem ipsum dolor sit amet."}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <NavLink>
                    Theo giới tính{" "}
                    <span className="arrow-down">
                      <svg
                        className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                        viewBox="0 0 1024 1024"
                      >
                        <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                      </svg>
                    </span>
                  </NavLink>
                  <ul className="submenu2">
                    {OPTION_SEX?.map((sex) => (
                      <li key={`${sex?.value}`}>
                        <NavLink
                          onClick={() => {
                            onChangeCheckboxSex(sex?.value);
                            onChangeRenderCheckboxSex(sex);
                          }}
                          to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                            limit: _LIMIT,
                            page: 0,
                            sex: sex?.value,
                          })}`}
                        >
                          {sex?.label || "Lorem ipsum dolor sit amet."}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <NavLink>
                    Sản phẩm theo loại da
                    <span className="arrow-down">
                      <svg
                        className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                        viewBox="0 0 1024 1024"
                      >
                        <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                      </svg>
                    </span>
                  </NavLink>
                  <ul className="submenu2">
                    {OPTION_SKIN_TYPE?.map((skin) => (
                      <li key={`${skin?.value}`}>
                        <NavLink
                          onClick={() => {
                            onChangeCheckboxSkinType(skin?.value);
                            onChangeRenderCheckboxSkinType(skin);
                          }}
                          to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                            limit: _LIMIT,
                            page: 0,
                            skinType: skin?.value,
                          })}`}
                        >
                          {skin?.label || "Lorem ipsum dolor sit amet."}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <NavLink>
                    Thói quen{" "}
                    <span className="arrow-down">
                      <svg
                        className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                        viewBox="0 0 1024 1024"
                      >
                        <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                      </svg>
                    </span>
                  </NavLink>
                  <ul className="submenu2">
                    {OPTION_LIFE_STYLE?.map((lifeStyle) => (
                      <li key={`${lifeStyle?.value}`}>
                        <NavLink
                          onClick={() => {
                            onChangeCheckboxLifeStyle(lifeStyle?.value);
                            onChangeRenderCheckboxLifeStyle(lifeStyle);
                          }}
                          to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                            limit: _LIMIT,
                            page: 0,
                            hobby: lifeStyle?.value,
                          })}`}
                        >
                          {lifeStyle?.label || "Lorem ipsum dolor sit amet."}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to={`${PATHS.ABOUT}`}>chúng tôi</NavLink>
            </li>
            <li>
              <NavLink to={`${PATHS.BLOG.INDEX}`}>tin tức</NavLink>
            </li>
            <li>
              <NavLink to={`${PATHS.CONTACT}`}>liên hệ</NavLink>
            </li>
            <li>
              <TextChangeColor>
                <NavLink className={`animate-charcter`} to={`${PATHS.COUNSEL}`}>
                  Tư vấn
                </NavLink>
              </TextChangeColor>
            </li>
          </ul>
        </div>
        <ul className="header__info mymenu relative">
          <li
            className={`header__info-search group/hover 
              first-letter: before:h-[20px] ${
                toggleSearch ? "before:block " : "before:hidden"
              }`}
            onClick={() => showDrawer("search")}
          >
            <div
              onClick={onToggleSearch}
              className="h-full w-full flex items-center justify-center"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path
                  fill="#555"
                  className="group-hover/hover:fill-primary duration-400 transition-colors"
                  d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
                />
              </svg>
            </div>
          </li>
          <Drawer
            key={`my-drawer-search`}
            rootClassName="my-drawer"
            title={`Tìm kiếm sản phẩm`}
            placement="right"
            onClose={onClose}
            open={open === "search"}
            contentWrapperStyle={{ width: "460px" }}
            footer={
              <div
                onClick={onClose}
                className={`flex justify-center items-center `}
              >
                <Button
                  link={PATHS.SHOP.INDEX}
                  variant="outline-secondary"
                  className={`w-full uppercase text-center text-sm xs:py-[12px] md:py-[17px]`}
                >
                  Xem thêm các sản phẩm khác
                </Button>
              </div>
            }
          >
            <div className="relative w-full ">
              <div className="mr-[12px]">
                <input
                  value={searchTerm}
                  onChange={onChangeSearch}
                  className={`rounded-[50px] text-sm text-black-555 font-osr duration-400 transition-all
                          bg-[#EDEEEF] pl-[20px] p-[11.5px_50px_11.5px_12px] w-full`}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div
                  className={`absolute z-10 top-1/2 -translate-y-1/2   flex items-center justify-center
                       rounded-tr-[50px] rounded-br-[50px]  right-0 p-[10px] h-[42px]
                      cursor-pointer   transition-all duration-400 bg-black-555 hover:bg-primary`}
                >
                  <button
                    onClick={onClickSearch}
                    className="text-sm font-osr text-white"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full mt-[20px]">
              <ul className="product__list h-full flex flex-col ">
                {productListSearch?.length ? (
                  productListSearch.map((item, index) => {
                    const { image, name, _id, countInStock, price, discount } =
                      item || {};
                    return (
                      <li
                        key={`${_id}`}
                        className="product__list-item flex items-center w-full justify-between gap-3 not-firstChild:pt-[10px] pb-[10px]"
                      >
                        <Link
                          to={`${PATHS.SHOP.INDEX}/${_id}`}
                          className="relative block   min-h-[84px] min-w-[84px] "
                        >
                          <img
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/img/error.png";
                            }}
                            className="w-full h-full object-cover center-absolute rounded-[6px] border border-solid
                              border-[#e2e0e0] duration-400 transition-colors hover:border-primary "
                            src={image?.[0]}
                            alt=""
                          />
                        </Link>
                        <div className="w-full h-full flex flex-col gap-[8px] justify-center">
                          <div className="flex items-start gap-3">
                            <Link
                              to={`${PATHS.SHOP.INDEX}/${_id}`}
                              className="text-sm text-black-555 font-om leading-[16px] truncate line-clamp-2 w-full
                                       whitespace-normal hover:text-primary transition-colors duration-400"
                            >
                              {name}
                            </Link>
                          </div>
                          <div className="text-sm flex gap-1 items-center justify-between ">
                            {countInStock ? (
                              <span
                                className={`font-om ${
                                  statusUpdateWhiteList !==
                                  THUNK_STATUS.fulfilled
                                    ? "text-[#d9d9d9]"
                                    : "text-secondary"
                                }`}
                              >
                                Còn {countInStock} sản phẩm
                              </span>
                            ) : (
                              <span className="font-om text-red-400">
                                Hết hàng
                              </span>
                            )}

                            <div className="flex gap-1 items-center">
                              {discount ? (
                                <span className="line-through font-om text-black-be  leading-[18px]">
                                  {formatPriceVND(price)}
                                </span>
                              ) : (
                                ""
                              )}
                              <span className="font-osb text-black">
                                {formatPriceVND(price - discount)}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`relative cursor-pointer font-ossb text-sm  capitalize flex 
                                    items-center justify-start gap-[6px] group hover:text-primary duration-400 transition-all ${
                                      countInStock === 0
                                        ? "pointer-events-none text-black-be"
                                        : "pointer-events-auto text-black-555"
                                    } group underline`}
                            onClick={() => onAddToCart(item)}
                          >
                            {countInStock !== 0 ? (
                              <div className="text-md ">
                                <svg
                                  className="h-[14px] w-[14px]"
                                  viewBox="0 0 491.00 491.00"
                                >
                                  <path
                                    className="duration-400 group-hover:fill-primary fill-black-555"
                                    d="M484.058,112.28c-7.247-10.404-19.144-16.614-31.816-16.614h-94.624c13.291,2.775,24.603,11.714,29.943,24.615 c1.063,2.569,1.761,5.212,2.283,7.869h62.396c2.063,0,3.997,1.015,5.155,2.67c1.175,1.698,1.444,3.862,0.73,5.791 l-44.992,121.107c-0.905,2.451-3.267,4.102-5.887,4.102H154.939L114.734,90.314c-5.01-21.286-23.772-36.153-45.631-36.153H24.361 C10.912,54.161,0,65.065,0,78.522s10.912,24.362,24.361,24.362h43.286l54.131,230.919c4.914,20.864,23.058,35.479,44.36,36.042 c-12.532,9.103-20.764,23.765-20.764,40.436c0,27.662,22.429,50.078,50.09,50.078c27.662,0,50.072-22.416,50.072-50.078 c0-16.605-8.17-31.212-20.623-40.326h93.421c-12.454,9.114-20.634,23.721-20.634,40.326c0,27.662,22.428,50.078,50.083,50.078 c27.646,0,50.072-22.416,50.072-50.078c0-16.605-8.187-31.212-20.634-40.326h22.714c13.448,0,24.361-10.901,24.361-24.361 c0-13.457-10.913-24.361-24.361-24.361h-231.07l-6.313-26.931h244.693c16.113,0,30.703-10.143,36.338-25.256l44.994-121.118 C492.986,136.046,491.305,122.732,484.058,112.28z"
                                  />
                                  <path
                                    className="duration-400 group-hover:fill-primary fill-black-555"
                                    d="M275.701,209.63c1.776,1.785,4.109,2.673,6.437,2.673c2.334,0,4.667-0.888,6.426-2.673l67.007-66.987 c2.621-2.609,3.396-6.525,1.986-9.935c-0.923-2.221-3.986-5.64-8.422-5.64c-6.472,0-25.886,0-25.886,0V95.665v-55.89 c-0.017-5.035-4.094-9.137-9.138-9.137h-63.964c-5.044,0-9.12,4.102-9.12,9.12v55.908v31.412c0,0-19.408,0-25.878,0 c-4.144,0-7.473,3.332-8.424,5.622c-1.41,3.41-0.635,7.334,1.962,9.943L275.701,209.63z"
                                  />
                                </svg>
                              </div>
                            ) : (
                              ""
                            )}
                            <div>
                              {countInStock === 0
                                ? "Hết hàng"
                                : " Thêm vào giỏ hàng"}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <EmptyWrapper>
                    <Empty description={`Không có sản phẩm`} />
                  </EmptyWrapper>
                )}
              </ul>
            </div>
          </Drawer>
          <li
            className="header__info-whitelist group/hover mb-[2px] relative"
            onClick={() => showDrawer("whitelist")}
          >
            <div className="relative ">
              <span
                className="text-xs text-white font-om rounded-[50%] bg-primary h-[18px] w-[18px]
                flex items-center justify-center absolute right-[-8px] top-[-8px] "
              >
                {whiteListInfo?.products?.length || 0}
              </span>
              <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
                <path
                  className="group-hover/hover:fill-primary duration-400 transition-colors"
                  fill="#555 "
                  d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
                />
              </svg>
            </div>
          </li>
          <Drawer
            key={`my-drawer-whitelist`}
            rootClassName="my-drawer"
            title="Sản phẩm yêu thích"
            placement="right"
            onClose={onClose}
            open={open === "whitelist"}
            contentWrapperStyle={{ width: "460px" }}
            footer={
              <div
                className={`flex flex-col gap-[12px] items-start justify-start `}
                onClick={onClose}
              >
                <p className="font-ossb text-15px text-black">Ưu đãi</p>
                <p className="font-om  text-black">
                  1/ Miễn phí vận chuyển cho đơn hàng từ{" "}
                  {formatPriceVND(1000000)}
                </p>
                <p className="font-om  text-black">
                  2/ Giảm 10% cho đơn hàng từ {formatPriceVND(3000000)}
                </p>
                <p className="font-om  text-black">
                  3/ Giảm 20% cho đơn hàng từ {formatPriceVND(5000000)}
                </p>
                <Button
                  link={PATHS.SHOP.INDEX}
                  variant="outline-secondary"
                  className={`w-full uppercase text-center text-sm xs:py-[12px] md:py-[17px]`}
                >
                  Xem thêm các sản phẩm khác
                </Button>
              </div>
            }
          >
            <div className="flex flex-col h-full">
              <ul className="product__list h-full flex flex-col ">
                {whiteListInfo?.products?.length ? (
                  whiteListInfo?.products.map((item, index) => {
                    const { image, name, _id, countInStock, price, discount } =
                      item || {};
                    return (
                      <li
                        key={`${_id}`}
                        className="product__list-item flex items-center w-full justify-between gap-3 not-firstChild:pt-[10px] pb-[10px]"
                      >
                        <Link
                          to={`${PATHS.SHOP.INDEX}/${_id}`}
                          className="relative block   min-h-[84px] min-w-[84px] "
                        >
                          <img
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/img/error.png";
                            }}
                            className="w-full h-full object-cover center-absolute rounded-[6px] border border-solid
                          border-[#e2e0e0] duration-400 transition-colors hover:border-primary "
                            src={image?.[0]}
                            alt=""
                          />
                        </Link>
                        <div className="w-full h-full flex flex-col gap-[8px] justify-center">
                          <div className="flex items-start gap-3">
                            <Link
                              to={`${PATHS.SHOP.INDEX}/${_id}`}
                              className={`text-sm  font-om leading-[16px] truncate line-clamp-2 w-full
                                   whitespace-normal hover:text-primary transition-colors duration-400
                                   ${
                                     statusUpdateWhiteList !==
                                     THUNK_STATUS.fulfilled
                                       ? "text-[#d9d9d9]"
                                       : "text-black-555"
                                   }`}
                            >
                              {name}
                            </Link>
                            <div
                              className={`font-om text-sm text-black-555 p-[2px] rounded-md group/delete transition-colors duration-400
                               border border-solid
                              ${
                                statusUpdateWhiteList !== THUNK_STATUS.fulfilled
                                  ? "border-[#d9d9d9]"
                                  : "border-black-555"
                              }  border-black-333 hover:border-red-500  `}
                            >
                              <button
                                onClick={() => onDeleteProductInWhiteList(_id)}
                                className=" block "
                              >
                                <svg
                                  className={`w-[14px] h-[14px] transition-colors duration-400 ${
                                    statusUpdateWhiteList !==
                                    THUNK_STATUS.fulfilled
                                      ? "text-[#d9d9d9]"
                                      : "text-black-555 group-hover/delete:text-red-500"
                                  } `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M9 9H11V17H9V9Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M13 9H15V17H13V9Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="text-sm flex gap-1 items-center justify-between ">
                            {countInStock ? (
                              <span
                                className={`font-om transition-colors duration-400 ${
                                  statusUpdateWhiteList !==
                                  THUNK_STATUS.fulfilled
                                    ? "text-[#d9d9d9]"
                                    : "text-secondary"
                                }`}
                              >
                                Còn {countInStock} sản phẩm
                              </span>
                            ) : (
                              <span className="font-om text-red-400">
                                Hết hàng
                              </span>
                            )}

                            <div className="flex gap-1 items-center">
                              {discount ? (
                                <span
                                  className={`line-through font-om leading-[18px] transition-colors duration-400
                                 ${
                                   statusUpdateWhiteList !==
                                   THUNK_STATUS.fulfilled
                                     ? "text-[#d9d9d9]"
                                     : "text-black-be"
                                 }`}
                                >
                                  {formatPriceVND(price)}
                                </span>
                              ) : (
                                ""
                              )}
                              <span
                                className={`font-osb transition-colors duration-400 ${
                                  statusUpdateWhiteList !==
                                  THUNK_STATUS.fulfilled
                                    ? "text-[#d9d9d9]"
                                    : "text-black-555"
                                }`}
                              >
                                {formatPriceVND(price - discount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <EmptyWrapper>
                    <Empty description={`Không có sản phẩm`} />
                  </EmptyWrapper>
                )}
              </ul>
            </div>
          </Drawer>
          <li
            className="header__info-cart group/hover mb-[2px] relative"
            onClick={() => showDrawer("cart")}
          >
            <div className="quantity relative">
              <span
                className="quantity__numb text-xs text-white font-om rounded-[50%] bg-primary h-[18px] w-[18px]
                 flex items-center justify-center absolute right-[-8px] top-[-8px] "
              >
                {cartInfo?.products?.length || 0}
              </span>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path
                  className={`group-hover/hover:fill-primary `}
                  fill="#555"
                  d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"
                />
              </svg>
            </div>
          </li>
          <Drawer
            key={`my-drawer-cart`}
            rootClassName="my-drawer"
            title="Giỏ hàng của bạn"
            placement="right"
            onClose={onClose}
            footer={
              cartInfo?.products?.length && (
                <div
                  className={`flex flex-col gap-[12px] items-start justify-center`}
                  onClick={onClose}
                >
                  <div
                    className={`w-full flex gap-1 items-center justify-between text-15px font-osb text-black`}
                  >
                    <p className="">Tạm tính giá trị đơn hàng</p>
                    <p className="tracking-wider">
                      {formatPriceVND(
                        cartInfo?.products?.reduce((acc, cur) => {
                          return (
                            acc + (cur?.price - cur?.discount) * cur?.quantity
                          );
                        }, 0)
                      )}
                    </p>
                  </div>
                  <p className={`font-om `}>
                    Bạn có thể xem các chương trình khuyến mãi ở màn hình kế
                    tiếp
                  </p>
                  <Button
                    link={PATHS.CART}
                    variant="outline-secondary"
                    className={`w-full uppercase text-center text-sm xs:py-[12px] md:py-[17px]  `}
                  >
                    Tiếp tục với hình thức giao hàng
                  </Button>
                </div>
              )
            }
            open={open === "cart"}
            contentWrapperStyle={{ width: "460px" }}
          >
            <div className="flex flex-col h-full">
              <ul className="product__list h-full flex flex-col ">
                {cartInfo?.products?.length ? (
                  cartInfo?.products.map((item, index) => {
                    const { image, name, _id, quantity, price, discount } =
                      item || {};
                    return (
                      <li
                        key={`${_id}`}
                        className="product__list-item flex items-center w-full justify-between gap-3 not-firstChild:pt-[10px] pb-[10px]"
                      >
                        <Link
                          to={`${PATHS.SHOP.INDEX}/${_id}`}
                          className="relative block   min-h-[84px] min-w-[84px] "
                        >
                          <img
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/img/error.png";
                            }}
                            className="w-full h-full object-cover center-absolute rounded-[6px] border border-solid
                          border-[#e2e0e0] duration-400 transition-colors hover:border-primary "
                            src={image?.[0]}
                            alt=""
                          />
                        </Link>
                        <div className="w-full h-full flex flex-col gap-[8px] justify-center">
                          <div className="flex items-start gap-3">
                            <Link
                              to={`${PATHS.SHOP.INDEX}/${_id}`}
                              className={`text-sm text- font-om leading-[16px] truncate line-clamp-2 w-full
                                   whitespace-normal hover:text-primary duration-400 transition-colors ${
                                     updateStatusUpdateCart !==
                                     THUNK_STATUS.fulfilled
                                       ? "text-[#d9d9d9]"
                                       : "text-black-555"
                                   } `}
                            >
                              {name}
                            </Link>

                            <div
                              className={`font-om text-sm  border border-solid 
                              p-[2px] rounded-md group/delete duration-400 transition-colors 
                            ${
                              updateStatusUpdateCart !== THUNK_STATUS.fulfilled
                                ? "border-[#d9d9d9] "
                                : "border-black-555 hover:border-red-500"
                            }`}
                            >
                              <button
                                onClick={() => onDeleteProductInCart(_id)}
                                className=" block "
                              >
                                <svg
                                  className={`w-[14px] h-[14px] transition-colors duration-400 ${
                                    updateStatusUpdateCart !==
                                    THUNK_STATUS.fulfilled
                                      ? "text-[#d9d9d9]"
                                      : "text-black-555 group-hover/delete:text-red-500"
                                  } `}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M9 9H11V17H9V9Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M13 9H15V17H13V9Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="text-sm  flex gap-1 justify-between items-center">
                            <div className=" w-fit flex items-center border border-solid border-[#ececec] rounded-[20px]  h-[30px]">
                              <QuantityInput
                                loading={
                                  updateStatusUpdateCart !==
                                  THUNK_STATUS.fulfilled
                                }
                                min={min}
                                max={max}
                                value={quantity}
                                onChange={(value) => {
                                  return onChangeQuantity(value, index);
                                }}
                              />
                            </div>
                            <div className="flex gap-1 items-center">
                              {discount ? (
                                <span
                                  className={`line-through font-om leading-[18px] duration-400 transition-colors ${
                                    updateStatusUpdateCart !==
                                    THUNK_STATUS.fulfilled
                                      ? "text-[#d9d9d9]"
                                      : "text-black-be"
                                  }`}
                                >
                                  {formatPriceVND(price)}
                                </span>
                              ) : (
                                ""
                              )}
                              <span
                                className={`font-osb duration-400 transition-colors ${
                                  updateStatusUpdateCart !==
                                  THUNK_STATUS.fulfilled
                                    ? "text-[#d9d9d9]"
                                    : "text-black"
                                }`}
                              >
                                {formatPriceVND(price - discount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <EmptyWrapper>
                    <Empty description={`Không có sản phẩm`} />
                  </EmptyWrapper>
                )}
              </ul>
            </div>
          </Drawer>
          <li className="header__info-profile  group/hover relative">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary "
                fill="#555"
                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
              />
            </svg>
            {profile ? (
              <ul className="submenu">
                <li>
                  <Link
                    to={PATHS.PROFILE.INDEX}
                    onClick={() => onActiveLinkTab(0)}
                  >
                    <img
                      className="w-[40px] h-[40px] rounded-[50%]"
                      src={`${
                        profile?.image
                          ? profile?.image
                          : "/assets/img/avartar.png"
                      }`}
                      alt=""
                    />
                    {profile ? `${profile?.name}` : "Guest"}
                  </Link>
                </li>
                {profile?.isAdmin ? (
                  <li>
                    <Link to={PATHS.CMS.INDEX}>
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                        <path
                          d="M14.8284 6.34313L16.2426 4.92892L12 0.686279L7.75735 4.92892L9.17156 6.34313L12 3.51471L14.8284 6.34313Z"
                          fill="currentColor"
                        />
                        <path
                          d="M4.92892 16.2426L6.34313 14.8284L3.51471 12L6.34313 9.17156L4.92892 7.75735L0.686279 12L4.92892 16.2426Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.75735 19.0711L12 23.3137L16.2426 19.0711L14.8284 17.6568L12 20.4853L9.17156 17.6568L7.75735 19.0711Z"
                          fill="currentColor"
                        />
                        <path
                          d="M17.6568 9.17156L20.4853 12L17.6568 14.8284L19.0711 16.2426L23.3137 12L19.0711 7.75735L17.6568 9.17156Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
                          fill="currentColor"
                        />
                      </svg>
                      Quản lí trang
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link
                    to={PATHS.PROFILE.ORDER}
                    onClick={() => onActiveLinkTab(1)}
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                        fill="currentColor"
                      />
                    </svg>
                    Đơn mua
                  </Link>
                </li>
                <li>
                  <Link
                    to={PATHS.PROFILE.WHITELIST}
                    onClick={() => onActiveLinkTab(2)}
                  >
                    <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
                      <path
                        d="M9.14648 12.2929C8.36544 11.5118 8.36544 10.2455 9.14648 9.46444C9.92753 8.68339 11.1939 8.68339 11.9749 9.46444L12 9.48955L12.0251 9.46449C12.8061 8.68345 14.0725 8.68345 14.8535 9.46449C15.6346 10.2455 15.6346 11.5119 14.8535 12.2929L12.0251 15.1213L12 15.0962L11.9749 15.1213L9.14648 12.2929Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 4C3 2.34315 4.34315 1 6 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V4ZM6 3H18C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z"
                      />
                    </svg>
                    Sản phẩm yêu thích
                  </Link>
                </li>
                <li onClick={onLogout}>
                  <a className="text-red-700">
                    <svg className="h-[20px] w-[20px]" viewBox="0 0 24 24">
                      <path
                        d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
                        className="fill-red-600"
                      ></path>
                      <path
                        d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
                        className="fill-red-600"
                      ></path>
                    </svg>
                    <p>Đăng xuất</p>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="submenu shadow-header right-0 left-[unset]">
                <li onClick={() => onAuthenModal("login")}>
                  <a>
                    <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
                      <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"></path>
                    </svg>
                    Đăng nhập
                  </a>
                </li>
                <li onClick={() => onAuthenModal("register")}>
                  <a>
                    <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
                      <path d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"></path>
                    </svg>
                    Đăng ký
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

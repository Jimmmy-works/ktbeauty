import Button from "@/components/Button";
import Hamburger from "@/components/Hamburger";
import { PATHS } from "@/contants/path";
import { formatPriceVND } from "@/utils/formatPrice";
import { Drawer, Empty } from "antd";
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
const Header = () => {
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
    onChangeCategory,
    categoryTab,
    width,
  } = headerProps || {};
  const refHeader = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const onClickSearch = () => {
    onSearchProduct(searchTerm);
  };
  const onToggleSearch = (e) => {
    setToggleSearch(!toggleSearch);
  };
  const categoryAll = categories
    ?.filter((cate) => cate?.name === "all")
    ?.map((item) => item?._id);
  const [open, setOpen] = useState("");
  const showDrawer = (name) => {
    setOpen(name);
  };
  const onClose = () => {
    setOpen("");
  };
  const max = 20;
  const min = 1;
  const [numbInput, setNumbInput] = useState(min);
  const onIncrease = () => {
    const value = modifyValue(Number(numbInput) + 1);
    setNumbInput(value);
  };
  const onDecrease = () => {
    const value = modifyValue(Number(numbInput) - 1);
    setNumbInput(value);
  };
  const onChangeInput = (e) => {
    setNumbInput(modifyValue(Number(e.target.value)));
  };
  const modifyValue = (value) => {
    if (value > max) {
      return (value = max);
    } else if (value < min) {
      return (value = min);
    } else {
      return value;
    }
  };
  const listRef = useRef([]);
  useEffect(() => {
    // const time = setTimeout(() => {
    //   onSearchProduct(searchTerm);
    // }, 500);
    // if (!toggleSearch) {
    //   setSearchTerm("");
    // }
    // return () => clearTimeout(time);
    if (!toggleSearch) {
      setSearchTerm("");
    }
  }, [searchTerm, toggleSearch]);
  useEffect(() => {
    setSearchTerm("");
    onClose();
  }, [pathname]);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const contentStyle = {
    margin: 0,
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
  };
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
      <div className="header__main">
        <NavLink to={`${PATHS.HOME}`} className={`header__logo `}>
          {/* <svg className="group " viewBox="3 -40.5 215.18 41.1">
            <path
              className="fill-black-555 group-hover:fill-primary duration-400 transition-colors"
              d="M11.95 0L3 0 3-40.5 11.95-40.5 11.95-23.95 18.75-40.5 27.5-40.5 20-22.2 27.85 0 18.75 0 12.9-17.9 11.95-16.3 11.95 0ZM44 0L35 0 35-33.85 28.9-33.85 28.9-40.5 50.05-40.5 50.05-33.85 44-33.85 44 0ZM78.84 0L66.39 0 66.39-40.5 76.94-40.5Q79.54-40.5 81.87-40.1 84.19-39.7 85.99-38.58 87.79-37.45 88.82-35.38 89.84-33.3 89.84-29.9L89.84-29.9Q89.84-27.45 89.12-25.78 88.39-24.1 87.07-23.1 85.74-22.1 83.89-21.75L83.89-21.75Q86.24-21.45 87.84-20.23 89.44-19 90.27-16.95 91.09-14.9 91.09-12L91.09-12Q91.09-8.85 90.27-6.58 89.44-4.3 87.89-2.85 86.34-1.4 84.07-0.7 81.79 0 78.84 0L78.84 0ZM75.34-18.4L75.34-6.25 77.24-6.25Q80.19-6.25 81.32-7.75 82.44-9.25 82.44-12.15L82.44-12.15Q82.44-14.45 81.94-15.8 81.44-17.15 80.29-17.78 79.14-18.4 77.19-18.4L77.19-18.4 75.34-18.4ZM75.34-34.5L75.34-24.3 77.09-24.3Q79.14-24.3 80.19-24.93 81.24-25.55 81.62-26.75 81.99-27.95 81.99-29.65L81.99-29.65Q81.99-31.25 81.42-32.33 80.84-33.4 79.72-33.95 78.59-34.5 76.89-34.5L76.89-34.5 75.34-34.5ZM114.09 0L95.79 0 95.79-40.5 113.99-40.5 113.99-34.4 104.74-34.4 104.74-24.35 111.79-24.35 111.79-18.15 104.74-18.15 104.74-6.05 114.09-6.05 114.09 0ZM124.64 0L116.19 0 123.84-40.5 134.04-40.5 141.59 0 133.34 0 131.99-8.55 126.04-8.55 124.64 0ZM128.99-29.7L126.84-13.9 131.14-13.9 128.99-29.7ZM156.99 0.6L156.99 0.6Q152.34 0.6 149.71-0.93 147.09-2.45 146.04-5.38 144.99-8.3 144.99-12.55L144.99-12.55 144.99-40.5 153.84-40.5 153.84-11.2Q153.84-9.95 154.04-8.7 154.24-7.45 154.91-6.65 155.59-5.85 156.99-5.85L156.99-5.85Q158.44-5.85 159.09-6.65 159.74-7.45 159.91-8.7 160.09-9.95 160.09-11.2L160.09-11.2 160.09-40.5 168.99-40.5 168.99-12.55Q168.99-8.3 167.91-5.38 166.84-2.45 164.24-0.93 161.64 0.6 156.99 0.6ZM187.33 0L178.33 0 178.33-33.85 172.23-33.85 172.23-40.5 193.38-40.5 193.38-33.85 187.33-33.85 187.33 0ZM210.63 0L202.03 0 202.03-16.55 194.33-40.5 202.78-40.5 206.63-27.7 210.08-40.5 218.18-40.5 210.63-16.55 210.63 0Z"
            ></path>
          </svg> */}

          <img srcSet="/assets/img/sammishop.png 10x" alt="" />
        </NavLink>
        <Hamburger isNavbar={isNavbar} onToggleNav={onToggleNav} />
        <ul className="header__menu xs:hidden lg:flex">
          <li className="header__menu-item ">
            <NavLink to={`${PATHS.HOME}`}>trang chủ</NavLink>
          </li>
          <li className="header__menu-item relative ">
            <NavLink
              to={`${PATHS.SHOP.INDEX}`}
              onClick={() => onChangeCategory(categoryAll)}
            >
              sản phẩm
              <div className="arrow-down">
                <svg
                  className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
            </NavLink>
            {categories?.length ? (
              <ul className="sub">
                {categories?.map((item, index) => (
                  <li
                    key={`${item?._id}`}
                    className="sub__item capitalize min-w-[150px]"
                  >
                    <Link
                      onClick={() => onChangeCategory(item?._id)}
                      to={`${PATHS.SHOP.INDEX}`}
                    >
                      {item?.name || "Lorem ipsum dolor sit amet."}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </li>
          <li className="header__menu-item relative">
            <NavLink to={`${PATHS.BLOG.INDEX}`}>
              tin tức
              <div className="arrow-down">
                <svg
                  className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
            </NavLink>
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
            <NavLink to={`${PATHS.ABOUT}`}>chúng tôi</NavLink>
          </li>
          <li className="header__menu-item ">
            <NavLink to={`${PATHS.CONTACT}`}>liên hệ</NavLink>
          </li>
        </ul>
        <div className="header__info xs:hidden md:flex h-full items-center relative">
          <div
            className={`header__info-search group/hover 
              first-letter: before:h-[20px] ${
                toggleSearch ? "before:block " : "before:hidden"
              }`}
          >
            <div
              onClick={onToggleSearch}
              className="h-full w-full flex items-center justify-center"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path
                  fill="#555"
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
                />
              </svg>
            </div>
            <div
              className={`absolute z-0 md:min-w-[300px] 2xl:min-w-[400px] lg:top-[102px] md:top-[86px]  left-[-200%] 
              xs:hidden md:flex items-center rounded-[50px] shadow-header
              bg-white max-w-[400px] p-[10px_14px] gap-2  
               ${toggleSearch ? "opacity-100 visible" : "invisible opacity-0"}
               transition-all duration-300`}
            >
              <div className="relative w-full">
                <div>
                  <input
                    value={searchTerm}
                    onChange={onChangeSearch}
                    className={` rounded-[50px] text-sm text-black-555 font-osr duration-400 transition-all
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
                <ul
                  className={`absolute left-1/2 -translate-x-1/2  top-[62px] w-full min-w-max
                      transition-all duration-400 shadow-[0_5px_5px_0_rgba(0,0,0,0.15)] bg-white ${
                        productListSearch?.length
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      } duration-400`}
                >
                  {productListSearch?.length ? (
                    <h3 className="font-osb text-md text-black-555 p-[16px_14px_16px]">
                      Tổng {`${productListSearch?.length}`} sản phẩm
                    </h3>
                  ) : (
                    ""
                  )}
                  <ul
                    className={`min-w-max flex flex-col  max-h-[390px] overflow-y-scroll scrollbar-cart  p-[0px_14px_0px]
                    `}
                  >
                    {productListSearch?.length ? (
                      productListSearch?.map((item) => {
                        const { image, name, _id, price, discount } =
                          item || {};
                        return (
                          <li
                            key={_id}
                            className="flex items-center w-full gap-3 max-w-[280px] not-firstChild:pt-[10px] pb-[10px]"
                          >
                            <Link
                              to={`${PATHS.SHOP.INDEX}/${_id}`}
                              className="relative block min-h-[80px] min-w-[80px] "
                            >
                              <img
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/img/error.png";
                                }}
                                className="w-full h-full object-cover center-absolute hover:scale-105 transition-transform duration-300"
                                src={image?.[1]}
                                alt=""
                              />
                            </Link>
                            <div>
                              <Link
                                to={`${PATHS.SHOP.INDEX}/${_id}`}
                                className="text-[16px] text-black-555 font-ossb  truncate line-clamp-2 
                      whitespace-normal hover:text-primary transition-colors duration-400"
                              >
                                {name}
                              </Link>
                              <div
                                className=" text-xs text-primary font-osb flex gap-1 
                          items-center mt-[6px]"
                              >
                                <span className="line-through text-black-555">
                                  {formatPriceVND(price)}
                                </span>
                                <span className="text-sm">
                                  {formatPriceVND(price - discount)}
                                </span>
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
                  {productListSearch?.length ? (
                    <div className="text-sm flex items-center justify-center">
                      <Button
                        link={PATHS.PROFILE.WHITELIST}
                        variant="filled"
                        className={`w-full text-center  md:py-[12px]`}
                      >
                        Xem tất cả
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div
            className="header__info-whitelist group/hover mb-[2px] relative"
            onClick={() => showDrawer("whitelist")}
          >
            <div className="relative">
              <span
                className="text-xs text-white font-om rounded-[50%] bg-primary h-[18px] w-[18px]
                   flex items-center justify-center absolute right-[-8px] top-[-8px] "
              >
                {cartInfo?.products?.length || 0}
              </span>
              <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
                <path
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  fill="#555 "
                  d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
                />
              </svg>
            </div>
            {/* <ul
              className="absolute top-[150%] md:-right-[30%] lg:-right-[100%]
               invisible opacity-0 group-hover/hover:visible group-hover/hover:opacity-100
              group-hover/hover:top-[calc(100%+2px)] transition-all duration-400 shadow-[0_5px_5px_0_rgba(0,0,0,0.15)] bg-white"
            >
              {cartInfo?.products?.length ? (
                <h3 className="font-osb text-md text-black-555 p-[16px_14px_16px]">
                  {` (${cartInfo?.products?.length}) `}
                  Sản phẩm yêu thích
                </h3>
              ) : (
                ""
              )}
              <ul className="min-w-max flex flex-col  max-h-[390px] overflow-y-scroll scrollbar-cart  p-[0px_14px_0px]  ">
                {cartInfo?.products?.length ? (
                  cartInfo?.products?.map((item, index) => {
                    const { image, name, _id, price, discount } = item || {};
                    return (
                      <li
                        key={_id}
                        className="flex items-center w-full gap-3 max-w-[280px] not-firstChild:pt-[10px] pb-[10px]"
                      >
                        <Link
                          to={`${PATHS.SHOP.INDEX}/${_id}`}
                          className="relative block min-h-[80px] min-w-[80px] "
                        >
                          <img
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/img/error.png";
                            }}
                            className="w-full h-full object-cover center-absolute hover:scale-105 transition-transform duration-300"
                            src={image?.[1]}
                            alt=""
                          />
                        </Link>
                        <div>
                          <Link
                            to={`${PATHS.SHOP.INDEX}/${_id}`}
                            className="text-[16px] text-black-555 font-ossb  truncate line-clamp-2 
                      whitespace-normal hover:text-primary transition-colors duration-400"
                          >
                            {name}
                          </Link>
                          <div
                            className=" text-xs text-primary font-osb flex gap-1 
                          items-center   mt-[6px]"
                          >
                            <span className="line-through text-black-555">
                              {formatPriceVND(price)}
                            </span>
                            <span className="text-sm">
                              {formatPriceVND(price - discount)}
                            </span>
                          </div>
                          <button
                            onClick={() => onDeleteProductInCart(_id)}
                            className=" block font-om text-sm mt-[6px]  hover:text-red-500
                              text-black-555 transition-all duration-400 "
                          >
                            Xóa
                          </button>
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
              <div className="text-sm flex items-center justify-center">
                <Button
                  link={PATHS.PROFILE.WHITELIST}
                  variant="filled"
                  className={`w-full text-center  md:py-[12px]`}
                >
                  Xem tất cả
                </Button>
              </div>
            </ul> */}
          </div>
          <Drawer
            rootClassName="my-drawer"
            title="Sản phẩm yêu thích"
            placement="right"
            onClose={onClose}
            open={open === "whitelist"}
            contentWrapperStyle={{ width: "460px" }}
          >
            <div className="flex flex-col h-full">
              <ul className="product__list h-full flex flex-col ">
                {cartInfo?.products?.length ? (
                  cartInfo?.products.map((item, index) => {
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
                        <div className="w-full">
                          <div className="flex items-start gap-3">
                            <Link
                              to={`${PATHS.SHOP.INDEX}/${_id}`}
                              className="text-sm text-black-555 font-om leading-[16px] truncate line-clamp-2 w-full
                                   whitespace-normal hover:text-primary transition-colors duration-400"
                            >
                              {name}
                            </Link>
                            <div
                              className="font-om text-sm text-black-555 border border-solid 
                            border-black-333 hover:border-red-500  p-[2px] rounded-md group/delete transition-colors duration-400 "
                            >
                              <button
                                onClick={() => onDeleteProductInCart(_id)}
                                className=" block group-hover/delete:text-red-500  
                                text-red-555 transition-colors duration-400 "
                              >
                                <svg
                                  className="w-[14px] h-[14px]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
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
                          <div className="text-sm  flex gap-1 items-center justify-between mt-[6px]">
                            {countInStock ? (
                              <span className="font-om text-secondary">
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
              <div
                className={`flex flex-col gap-[16px] items-start justify-start border-solid border-t
                 border-[rgba(5,5,5,0.06)] pt-[20px] `}
              >
                <p className="font-om text text-black">Ưu đãi</p>
                <p className="font-om text text-black">
                  1/ Miễn phí vận chuyển cho đơn hàng từ{" "}
                  {formatPriceVND(1000000)}
                </p>
                <p className="font-om text text-black">
                  2/ Giảm 10% cho đơn hàng từ {formatPriceVND(3000000)}
                </p>
                <p className="font-om text text-black">
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
            </div>
          </Drawer>
          <div
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
                  className="group-hover/hover:fill-primary duration-300 transition-colors"
                  fill="#555"
                  d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"
                />
              </svg>
            </div>
          </div>
          <Drawer
            rootClassName="my-drawer"
            title="Giỏ hàng của bạn"
            placement="right"
            onClose={onClose}
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
                        <div className="w-full ">
                          <div className="flex items-start gap-3">
                            <Link
                              to={`${PATHS.SHOP.INDEX}/${_id}`}
                              className="text-sm text-black-555 font-om leading-[16px] truncate line-clamp-2 w-full
                                   whitespace-normal hover:text-primary transition-colors duration-400"
                            >
                              {name}
                            </Link>
                            <div
                              className="font-om text-sm text-black-555 border border-solid 
                            border-black-333 hover:border-red-500  p-[2px] rounded-md group/delete transition-colors duration-400 "
                            >
                              <button
                                onClick={() => onDeleteProductInCart(_id)}
                                className=" block group-hover/delete:text-red-500  
                                text-red-555 transition-colors duration-400 "
                              >
                                <svg
                                  className="w-[14px] h-[14px]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
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
                          <div className="text-sm  flex gap-1 justify-between items-center mt-[6px]">
                            <div className="input my-[6px] w-fit flex items-center border border-solid border-[#ececec] rounded-[20px]  h-[26px]">
                              <div
                                onClick={onDecrease}
                                className="h-full flex items-center justify-center p-[8px] cursor-pointer group"
                              >
                                <svg
                                  className="h-[12px] w-[12px]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    className="fill-black group-hover:fill-primary duration-300 transition-colors "
                                    d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                                  />
                                </svg>
                              </div>
                              <input
                                ref={(element) =>
                                  (listRef.current[index] = element)
                                }
                                className="w-[30px] text-[13px] tracking-wider text-center text-black-555 font-osb"
                                value={quantity}
                                type="number"
                                min={min}
                                max={max}
                                onChange={onChangeInput}
                              />
                              <div
                                onClick={onIncrease}
                                className="h-full flex items-center justify-center p-[8px] cursor-pointer  group"
                              >
                                <svg
                                  className="h-[12px] w-[12px]"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    className="fill-black group-hover:fill-primary duration-300 transition-colors "
                                    d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </div>
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
              <div
                className={`flex flex-col gap-[16px] items-center justify-center border-solid border-t
                 border-[rgba(5,5,5,0.06)] pt-[20px] `}
              >
                <div className="w-full flex gap-1 items-center justify-between text-15px font-osb text-black">
                  <p className="">Tổng giá trị đơn hàng</p>
                  <p className="">{formatPriceVND(304000)}</p>
                </div>
                <p className="font-om text text-black">
                  Bạn có thể xem các chương trình khuyến mãi ở màn hình kế tiếp
                </p>
                <Button
                  link={PATHS.CART}
                  variant="outline-secondary"
                  className={`w-full uppercase text-center text-sm xs:py-[12px] md:py-[17px]`}
                >
                  Tiếp tục với hình thức giao hàng
                </Button>
              </div>
            </div>
          </Drawer>

          <div className="header__info-profile group/hover relative">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary "
                fill="#555"
                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
              />
            </svg>
            {profile ? (
              <ul className="sub min-w-[200px] p-0 shadow-header right-0 left-[unset]">
                <li className="sub__item capitalize">
                  <Link
                    to={PATHS.PROFILE.INDEX}
                    className=" group-hover/hover:text-[#222] font-osb"
                    onClick={() => onActiveLinkTab(0)}
                  >
                    <div className=" rounded-[50%]">
                      <img
                        className="w-[50px] h-[50px] rounded-[50%]"
                        src={`${
                          profile?.image
                            ? profile?.image
                            : "/assets/img/avartar.png"
                        }`}
                        alt=""
                      />
                    </div>
                    {profile ? `${profile?.name}` : "Guest"}
                  </Link>
                </li>
                {profile?.isAdmin ? (
                  <li className="sub__item ">
                    <Link to={PATHS.CMS.INDEX} className="text-[#222]">
                      <svg className="h-[24px] w-[24px] ">
                        <path d="M7 16.488l1.526-.723c1.792-.81 2.851-.344 4.349.232 1.716.661 2.365.883 3.077 1.164 1.278.506.688 2.177-.592 1.838-.778-.206-2.812-.795-3.38-.931-.64-.154-.93.602-.323.818 1.106.393 2.663.79 3.494 1.007.831.218 1.295-.145 1.881-.611.906-.72 2.968-2.909 2.968-2.909.842-.799 1.991-.135 1.991.72 0 .23-.083.474-.276.707-2.328 2.793-3.06 3.642-4.568 5.226-.623.655-1.342.974-2.204.974-.442 0-.922-.084-1.443-.25-1.825-.581-4.172-1.313-6.5-1.6v-5.662zm-1 6.538h-4v-8h4v8zm1-7.869v-1.714c-.006-1.557.062-2.447 1.854-2.861 1.963-.453 4.315-.859 3.384-2.577-2.761-5.092-.787-7.979 2.177-7.979 2.907 0 4.93 2.78 2.177 7.979-.904 1.708 1.378 2.114 3.384 2.577 1.799.415 1.859 1.311 1.853 2.879 0 .13-.011 1.171 0 1.665-.483-.309-1.442-.552-2.187.106-.535.472-.568.504-1.783 1.629-1.75-.831-4.456-1.883-6.214-2.478-.896-.304-2.04-.308-2.962.075l-1.683.699z" />
                      </svg>
                      <p> Quản lí trang</p>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className=" sub__item ">
                  <Link
                    to={PATHS.PROFILE.ORDER}
                    onClick={() => onActiveLinkTab(1)}
                    className="text-[#222] "
                  >
                    <svg className="h-[24px] w-[24px] " viewBox="0 0 24 24">
                      <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
                    </svg>
                    <p>Đơn mua</p>
                  </Link>
                </li>
                <li className=" sub__item ">
                  <Link
                    to={PATHS.PROFILE.WHITELIST}
                    onClick={() => onActiveLinkTab(2)}
                    className="text-[#222] "
                  >
                    <svg className="w-[22px] h-[22px] " viewBox="0 0 24 24">
                      <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"></path>
                    </svg>
                    <p>Sản phẩm yêu thích</p>
                  </Link>
                </li>
                <li className=" sub__item ">
                  <Link
                    to={PATHS.PROFILE.ADDRESS}
                    onClick={() => onActiveLinkTab(3)}
                    className="text-[#222] "
                  >
                    <svg viewBox="0 0 64 64" className="w-[20px] h-[20px]">
                      <path
                        d="M62.364,0.773c-0.694-0.509-1.526-0.772-2.366-0.772c-0.403,0-0.809,0.061-1.202,0.185L41.033,5.795
                            l-16.769-5.59C23.854,0.068,23.427,0,22.999,0c-0.468,0-0.937,0.082-1.382,0.247l-19,7C1.045,7.826,0,9.324,0,11v49
                            c0,1.274,0.607,2.473,1.636,3.227C2.33,63.735,3.16,64,4,64c0.404,0,0.811-0.062,1.204-0.186L23,58.194l17.796,5.62
                            C41.188,63.938,41.593,64,41.999,64c0.428,0,0.855-0.068,1.266-0.205l18-6C62.898,57.25,64,55.722,64,54V4
                            C64,2.726,63.393,1.527,62.364,0.773z M59.396,2.094c0.195-0.062,0.398-0.093,0.603-0.093c0.425,0,0.845,0.137,1.184,0.386
                            C61.694,2.762,62,3.365,62,4v25.086c-0.234-0.036-0.477-0.083-0.732-0.132c-1.167-0.233-1.899-0.521-2.78-1.546
                            c-1.04-1.188-0.435-3.11-1.581-4.114c-0.442-0.378-0.866-0.504-1.294-0.504c-0.824-0.001-1.662,0.468-2.675,0.504
                            c-1.666,0.074-2.812,0.756-4.194,0.756c-0.427,0-0.877-0.064-1.372-0.233c-1.342-0.46-1.856-1.511-3.178-2.061
                            c-0.426-0.18-0.815-0.291-1.193-0.374V15.19c1.126,0.401,2.13,0.773,3.575,0.912c0.791,0.079,1.43,0.38,2.07,0.38
                            c0.36,0,0.721-0.096,1.108-0.38c1.199-0.894,2.229-2.522,1.592-4.108c-0.414-1.045-1.411-0.652-1.995-1.545
                            c-0.626-0.984-0.329-1.883-0.785-3.078c0.284-0.876,0.768-1.492,1.036-2.185L59.396,2.094z M46.697,8.084
                            c0.111,0.293,0.146,0.587,0.189,0.959c0.076,0.65,0.181,1.542,0.776,2.479c0.603,0.921,1.396,1.265,1.872,1.448
                            c0.015,0.529-0.5,1.163-0.948,1.507c-0.121-0.017-0.339-0.071-0.505-0.113c-0.354-0.09-0.794-0.2-1.309-0.252
                            c-1.154-0.111-1.96-0.398-2.979-0.763c-0.246-0.088-0.52-0.182-0.794-0.275V7.271l3.962-1.251
                            c-0.104,0.229-0.211,0.462-0.299,0.734C46.522,7.188,46.534,7.658,46.697,8.084z M41,21.214c-0.543,0.011-1.101,0.04-1.729,0.04
                            c-0.204,0-0.414-0.004-0.634-0.013c-0.118-0.005-0.233-0.007-0.347-0.007c-1.107,0-1.954,0.213-2.901,0.213
                            c-0.467,0-0.957-0.052-1.517-0.206c-1.29-0.358-2.361-0.188-3.179-1.532c-0.949-1.595-0.901-3.518,0-5.152
                            c0.944-1.69,2.367-1.306,3.975-1.539c0.296-0.04,0.575-0.059,0.843-0.059c1.997,0,3.314,1.027,5.488,1.592V21.214z M31.443,44.217
                            c-0.53,1.29-1.509,1.559-2.606,1.559c-0.188,0-0.379-0.008-0.572-0.02c-1.178-0.069-1.708-0.907-2.78-1.539
                            c-1.021-0.602-1.726-1.426-2.484-2.075v-12.98c0.747,1.009,1.04,2.037,2.081,2.711c0.404,0.262,0.789,0.354,1.165,0.354
                            c0.901,0,1.754-0.529,2.706-0.529c0.289,0,0.588,0.049,0.899,0.176c1.597,0.666,2.955,1.078,3.57,3.098
                            c0.403,1.3,0.414,2.296,0,3.587c-0.408,1.305-1.603,1.236-1.979,2.569C31.108,42.266,31.873,43.145,31.443,44.217z M2,19.156
                            c0.875-0.007,1.722-0.066,2.839-0.123c1.395-0.077,2.395-0.816,3.539-0.816c0.384,0,0.784,0.083,1.221,0.302
                            c1.337,0.652,1.586,2.073,2.785,3.077c1.81,1.518,3.247,1.292,5.163,2.577c1.428,0.959,2.418,1.758,3.453,2.786v14.21
                            c-0.095-0.013-0.18-0.039-0.28-0.043c-0.372-0.011-0.71-0.055-1.025-0.055c-0.485,0-0.921,0.102-1.357,0.576
                            c-0.753,0.811-0.105,2.186-0.79,3.078c-0.498,0.662-1.057,0.868-1.666,0.868c-0.592,0-1.231-0.193-1.91-0.353
                            c-1.364-0.311-1.815-1.725-3.173-2.055c-0.509-0.122-0.916-0.22-1.329-0.22c-0.329,0-0.661,0.062-1.054,0.22
                            c-1.688,0.687-1.969,2.589-2.786,4.63c-0.668,1.69-0.005,3.489-1.188,4.616c-0.575,0.549-1.126,0.718-1.722,0.718
                            c-0.231,0-0.471-0.026-0.719-0.064V19.156z M3.309,9.124L21,2.606V24.25c-0.702-0.588-1.444-1.137-2.338-1.737
                            c-1.082-0.726-2.019-1.056-2.845-1.348c-0.836-0.294-1.439-0.507-2.148-1.102c-0.3-0.251-0.536-0.607-0.811-1.021
                            c-0.507-0.764-1.138-1.715-2.383-2.322c-0.661-0.331-1.373-0.504-2.098-0.504c-0.902,0-1.653,0.257-2.314,0.484
                            c-0.488,0.167-0.91,0.312-1.335,0.335L3.922,17.08C3.188,17.12,2.598,17.152,2,17.156V11C2,10.166,2.525,9.412,3.309,9.124z
                            M4.603,61.907C4.407,61.969,4.204,62,4,62c-0.428,0-0.837-0.134-1.182-0.387C2.306,61.238,2,60.635,2,60v-4.904
                            c0.235,0.028,0.472,0.055,0.719,0.055c1.191,0,2.207-0.416,3.103-1.271c1.256-1.195,1.357-2.717,1.433-3.827
                            c0.037-0.561,0.073-1.09,0.235-1.5c0.18-0.449,0.338-0.899,0.489-1.333c0.482-1.375,0.74-1.996,1.19-2.18
                            c0.178-0.072,0.257-0.072,0.3-0.072c0.18,0,0.496,0.076,0.861,0.164c0.147,0.036,0.396,0.274,0.659,0.526
                            c0.554,0.529,1.312,1.255,2.537,1.534l0.363,0.088c0.597,0.147,1.273,0.314,1.991,0.314c1.315,0,2.444-0.576,3.265-1.666
                            c0.714-0.931,0.746-1.975,0.769-2.666c0.002-0.054,0.004-0.117,0.006-0.181c0.056,0.003,0.112,0.008,0.17,0.012
                            c0.183,0.014,0.372,0.026,0.57,0.032c0.118,0.005,0.229,0.027,0.34,0.068v13.535L4.603,61.907z M23.603,56.287L23,56.097V44.85
                            c0.422,0.373,0.894,0.751,1.47,1.091c0.24,0.142,0.469,0.32,0.71,0.51c0.656,0.515,1.555,1.219,2.968,1.302
                            c0.229,0.015,0.461,0.023,0.689,0.023c2.193,0,3.692-0.941,4.456-2.798c0.448-1.117,0.263-2.077,0.14-2.712
                            c-0.045-0.23-0.095-0.492-0.07-0.576l0.017-0.052c0.03-0.04,0.184-0.16,0.295-0.249c0.476-0.374,1.271-1.001,1.657-2.234
                            c0.526-1.645,0.528-3.077,0.001-4.777c-0.843-2.765-2.795-3.565-4.364-4.208l-0.347-0.143c-0.541-0.221-1.098-0.33-1.669-0.33
                            c-0.773,0-1.433,0.196-1.961,0.354c-0.291,0.087-0.592,0.176-0.745,0.176c-0.02-0.001-0.038-0.007-0.078-0.032
                            c-0.288-0.187-0.476-0.492-0.81-1.06c-0.279-0.476-0.627-1.066-1.146-1.657c-0.434-0.493-0.83-0.927-1.213-1.329V2
                            c0.216,0,0.428,0.034,0.632,0.103L40.4,7.692L41,7.892v4.565c-0.504-0.16-0.979-0.337-1.462-0.53
                            c-1.183-0.476-2.407-0.968-4.026-0.968c-0.364,0-0.739,0.025-1.114,0.077c-0.293,0.042-0.587,0.061-0.898,0.079
                            c-1.308,0.079-3.284,0.199-4.551,2.466c-1.275,2.313-1.263,4.982,0.027,7.151c1.096,1.803,2.63,2.09,3.646,2.281
                            c0.253,0.047,0.492,0.092,0.717,0.154c0.681,0.188,1.352,0.279,2.052,0.279c0.569,0,1.074-0.058,1.562-0.113
                            c0.451-0.051,0.877-0.1,1.339-0.1c0.086,0,0.175,0.002,0.265,0.005c0.249,0.011,0.486,0.015,0.716,0.015
                            c0.416,0,0.804-0.014,1.177-0.026c0.189-0.007,0.369-0.01,0.552-0.014v38.567L23.603,56.287z M60.632,55.897L43,61.774V23.449
                            c0.136,0.044,0.271,0.089,0.418,0.15c0.354,0.147,0.628,0.378,1.007,0.698c0.554,0.467,1.243,1.049,2.298,1.41
                            c0.677,0.23,1.336,0.342,2.021,0.342c0.955,0,1.78-0.222,2.508-0.418c0.597-0.161,1.16-0.312,1.775-0.34
                            c0.733-0.026,1.366-0.202,1.875-0.343c0.249-0.068,0.529-0.146,0.676-0.158c0.078,0.142,0.15,0.592,0.198,0.893
                            c0.139,0.859,0.328,2.037,1.207,3.042c1.218,1.417,2.395,1.89,3.893,2.189l0.104,0.021c0.331,0.062,0.672,0.118,1.021,0.16V54
                            C62,54.862,61.45,55.625,60.632,55.897z"
                      />
                      <path
                        d="M55.306,39.322c-0.678-0.208-1.318-0.404-2.01-0.404c-0.652,0-1.241,0.177-1.804,0.543
                                c-0.632,0.417-0.814,0.932-0.856,1.289c-0.111,0.965,0.604,1.723,1.361,2.525c0.506,0.536,1.27,1.346,1.122,1.731
                                c-0.096,0.256-0.386,0.396-0.979,0.633c-0.737,0.296-1.853,0.741-2.094,2.071c-0.136,0.738,0.032,1.416,0.485,1.96
                                c0.637,0.763,1.791,1.183,3.253,1.183c1.49,0,2.955-0.43,3.928-1.156c1.653-1.268,2.287-3.12,1.884-5.503
                                C59.194,41.763,57.732,40.085,55.306,39.322z M56.505,48.103c-0.61,0.456-1.679,0.751-2.721,0.751
                                c-0.919,0-1.523-0.232-1.717-0.464c-0.034-0.041-0.093-0.111-0.055-0.32c0.037-0.199,0.191-0.301,0.87-0.572
                                     c0.715-0.286,1.694-0.678,2.107-1.782c0.593-1.553-0.639-2.858-1.539-3.812c-0.238-0.252-0.57-0.604-0.735-0.843
                        c0.525-0.277,1.124-0.096,2.054,0.19c1.642,0.517,2.575,1.586,2.854,3.274C57.905,46.19,57.557,47.296,56.505,48.103z"
                      />
                    </svg>
                    <p>Vận chuyển</p>
                  </Link>
                </li>

                <li onClick={onLogout} className="sub__item ">
                  <a className="text-[#222] ">
                    <svg className=" h-[24px] w-[24px] " viewBox="0 0 256 256">
                      <path d="M14.7,12.7c-1.6,0.8-2.8,1.9-3.5,3.3L10,18.1v89.8c0,86.9,0.1,89.9,1,92c0.7,1.5,1.7,2.6,3.3,3.4c59.2,33.5,72,40.6,73.4,40.9c2.5,0.5,6.1-1,7.8-3.3l1.4-1.8l0.2-17.1l0.2-17.1l34.8-0.2c34-0.2,34.9-0.2,36.7-1.3c1-0.6,2.4-1.8,3-2.8l1.2-1.7v-28.4v-28.4h-8.1h-8.1v23v23H127H97.2l-0.1-65.7L97,56.7L95.6,55c-0.9-1.2-7.6-5.3-22.5-13.7c-11.6-6.6-21.5-12.2-21.9-12.5c-0.5-0.3,20.2-0.5,52.4-0.5h53.1v29.5v29.5h8.1h8.1V52.4V17.5l-1.1-1.7c-0.7-0.9-1.9-2.2-2.7-2.8l-1.5-1.1l-75.3-0.2L17,11.6L14.7,12.7z" />
                      <path d="M191.9,78.1l-1.5,1.3l-0.2,11.8l-0.2,11.8h-22c-13.1,0-23,0.3-24.4,0.6c-5.5,1.3-9.1,5.7-9.1,11.2c0.1,4.7,2.1,8.1,6.3,10.3c2,1.1,2.7,1.1,25.7,1.3l23.6,0.2l0.2,11.7l0.2,11.8l1.8,1.6c1.5,1.3,2.1,1.5,3.5,1.3c2.1-0.4,48.7-33.9,49.8-36c0.5-1,0.6-1.8,0.3-3.3c-0.5-1.8-2-3-24.5-19.4c-21.4-15.5-24.2-17.4-26-17.4C194,76.9,192.9,77.3,191.9,78.1z" />
                    </svg>
                    <p>Đăng xuất</p>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="sub min-w-[120px] p-0 shadow-header right-0 left-[unset]">
                <li
                  onClick={() => onAuthenModal("login")}
                  className=" sub__item   p-[10px]  duration-300 transition-colors hover:bg-black-ebe"
                >
                  <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                    <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"></path>
                  </svg>
                  <a className="text-[#222] ">Đăng nhập</a>
                </li>
                <li
                  onClick={() => onAuthenModal("register")}
                  className=" sub__item   p-[10px]  duration-300 transition-colors hover:bg-black-ebe"
                >
                  <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                    <path d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"></path>
                  </svg>
                  <a className="text-[#222] p-0">Đăng ký</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

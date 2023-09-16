import Accordion from "@/components/Accordion";
import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useShop from "./useShop";
import SelectCustom from "@/components/Select/SelectCustom";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import NavbarFilter from "@/components/NavbarFilter";
import { useMainContext } from "@/components/MainContext";
import useWindowSize from "@/utils/windowResize";
import InputRange from "@/components/Input/inputRange";

const Shop = () => {
  const {
    // min,
    // max,
    // onChangeMax,
    // onChangeMin,
    OPTIONS,
    isFilter,
    onToggleFilter,
    OPTIONS__MOBILE,
    setIsFilter,
  } = useShop();
  const { width } = useWindowSize();

  const images = [
    "product-9.jpg",
    "product-8.jpg",
    "product-7.jpg",
    "product-6.jpg",
    "product-5.jpg",
    "product-4.jpg",
    "product-3.jpg",
    "product-2.jpg",
    "product-1.jpg",
  ];
  const baseURL = `/assets/img/`;
  return (
    <main className="main-wrapper">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={`${PATHS.HOME}`}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>
          <Link to={PATHS.SHOP.INDEX}>Shop</Link>
        </BreadCrumb.Item>
      </BreadCrumb>
      <div className="container flex lg:flex-row xs:flex-col gap-[30px]">
        <aside
          className="sidebar-shop xs:w-full lg:max-w-[265px] lg:w-1/4 border-r-[5px] 
        border-solid border-[#e5e5e5] lg:block xs:hidden"
        >
          <div className=" lg:pr-[18.4px] xs:flex gap-4 lg:block">
            {OPTIONS?.map((item, index) => {
              return (
                <Accordion
                  key={`${item}${index}`}
                  item={item}
                  index={index}
                  renderProps={() => {
                    return <InputRange />;
                  }}
                />
              );
            })}
          </div>
        </aside>
        <div className="w-full ">
          <div
            className="flex items-center justify-between py-[24px] mb-[30px] border-b 
          border-solid border-[#e5e5e5]"
          >
            <h2 className="font-mab text-md leading-[30px] text-black-333 uppercase">
              Shop
            </h2>
            {width < 1024 && (
              <div
                className="flex items-center  gap-2 p-2 bg-black-be rounded-[20px]"
                onClick={onToggleFilter}
              >
                <svg
                  className="rotate-[90deg] w-[16px] h-[16px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 8c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-10 6c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm10-8c.343 0 .677.035 1 .101v-2.101c0-.552-.447-1-1-1s-1 .448-1 1v2.101c.323-.066.657-.101 1-.101zm-10 6c.343 0 .677.035 1 .101v-8.101c0-.552-.447-1-1-1s-1 .448-1 1v8.101c.323-.066.657-.101 1-.101zm10 4c-.343 0-.677-.035-1-.101v8.101c0 .552.447 1 1 1s1-.448 1-1v-8.101c-.323.066-.657.101-1 .101zm-10 6c-.343 0-.677-.035-1-.101v2.101c0 .552.447 1 1 1s1-.448 1-1v-2.101c-.323.066-.657.101-1 .101z" />
                </svg>
                <p className="text-sm font-osr font-medium text-black-333">
                  Filter
                </p>
              </div>
            )}
            <NavbarFilter
              options={OPTIONS__MOBILE}
              isFilter={isFilter}
              onToggleFilter={onToggleFilter}
              setIsFilter={setIsFilter}
            />
            <div className=" gap-2 items-center xs:hidden lg:flex">
              <label className="font-osl text-black-333 text-sm">Sort:</label>
              <SelectCustom />
            </div>
          </div>
          <div
            className="flex items-center flex-wrap  xs:gap-y-[20px] xs:gap-x-[14px] md:gap-[20px] 
          lg:gap-[30px] mb-[30px]"
          >
            {images.map((item, index) => {
              return (
                <ProductCard
                  key={`${item}${index}`}
                  className={` xs:w-[calc(50%-7px)] md:w-[calc(50%-10px)] lg:w-[calc(33.333333%-20px)]`}
                  baseURL={baseURL}
                  item={item}
                  isProductDetail={true}
                />
              );
            })}
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
};

export default Shop;

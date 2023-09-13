import Accordion from "@/components/Accordion";
import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import { stringify } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useShop from "./useShop";
import SelectCustom from "@/components/Select/SelectCustom";
import ProductCard from "@/components/ProductCard";
import { Rate } from "antd";

const Shop = () => {
  const { inputRangeProps } = useShop();
  const inputFilter = () => {
    return (
      <>
        <div className="range mt-[20px] ">
          <div className="slider overflow-x-hidden">
            <div className="progress"></div>
          </div>
          <div className="range-input ">
            <input
              type="range"
              className="range-min"
              min={0}
              max={10000}
              step={100}
              value={inputRangeProps?.min}
              onChange={inputRangeProps?.onChangeMin}
            />
            <input
              type="range"
              className="range-max"
              min={0}
              max={10000}
              step={100}
              value={inputRangeProps?.max}
              onChange={inputRangeProps?.onChangeMax}
            />
          </div>
          <div
            className="price-input flex items-center  xs:mt-[16px] lg:mt-[26px] xs:gap-y-[14px] gap-1 
          flex-wrap lg:flex-nowrap"
          >
            <p className="font-mar text-md w-fit ">$</p>
            <p
              className="price-min border-solid border border-[#e5e5e5] rounded-[4px] px-[10px]
              py-[5px] min-w-[60px] min-h-[30px]
              text-black-333 text-sm font-mar flex items-center justify-center "
            >
              {inputRangeProps?.min}
            </p>
            <p className="w-[5px] h-[1px] mx-[5px] bg-black-555"></p>
            <p
              className="price-max border-solid border border-[#e5e5e5] rounded-[4px] px-[10px]
              py-[5px] min-w-[60px] min-h-[30px]
              text-black-333 text-sm font-mar flex items-center justify-center "
            >
              {inputRangeProps?.max}
            </p>
            <Button
              variant="filled"
              className={`rounded-[4px] py-[5.5px] px-[16.55px] lg:ml-[6px]`}
            >
              FILTER
            </Button>
          </div>
        </div>
      </>
    );
  };
  const OPTIONS = [
    {
      title: "Produc Categories",
      id: "1",
      quantity: "4",
      subCate: [
        {
          id: "product-1",
          title: "Base categories",
          quantity: "3",
          subCateChild: [
            {
              id: "product-child-1",
              title: "Lorem ipsum dolor sit amet number one",
              quantity: "4",
            },
            {
              id: "product-child-2",
              title: "Lorem ipsum dolor sit amet number two",
              quantity: "10",
            },
          ],
        },
      ],
    },
    {
      title: "Filter Price",
      id: "2",
      type: "range",
    },

    {
      title: "Filter Brand",
      id: "3",
      quantity: "3",
      subCate: [
        { id: "filter-1", title: "Milani", quantity: "6" },
        { id: "filter-2", title: "Laura", quantity: "5" },
        {
          id: "filter-3",
          title: "Vinoble Comics ",
          quantity: "7",
          subCateChild: [
            {
              id: "filter-child-1",
              title: "Lorem ipsum dolor number three",
              quantity: "4",
            },
            {
              id: "filter-child-2",
              title: "Lorem ipsum dolor sit amet four",
              quantity: "10",
            },
          ],
        },
      ],
    },
  ];
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
        <aside className="sidebar-shop xs:w-full lg:w-1/4 border-r-[5px] border-solid border-[#e5e5e5]">
          <div className=" lg:pr-[15px] xs:flex gap-4 lg:block">
            {OPTIONS?.map((item, index) => {
              return (
                <Accordion
                  className={`w-fit`}
                  key={`${item}${index}`}
                  item={item}
                  index={index}
                  renderProps={() => {
                    return inputFilter();
                  }}
                />
              );
            })}
          </div>
        </aside>
        <div className=" xs:w-full lg:w-3/4">
          <div
            className="flex  items-center justify-between  py-[24px]  mb-[30px] border-b 
          border-solid border-[#e5e5e5]"
          >
            <h2 className="font-mab text-md leading-[30px] text-black-333 uppercase">
              Shop
            </h2>
            <div className="flex gap-2 items-center">
              <label className="font-osl text-black-333 text-sm">Sort:</label>
              <SelectCustom />
            </div>
          </div>
          <div className="flex items-center  flex-wrap gap-[14px]">
            {images.map((item, index) => {
              return (
                <ProductCard
                  key={`${item}${index}`}
                  className={` md:w-[calc(50%-7px)] lg:w-[calc(33.333333%-9.5px)]`}
                  baseURL={baseURL}
                  item={item}
                  isProductDetail={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;

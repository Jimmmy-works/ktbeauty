import React, { useRef, useState } from "react";
import Button from "../Button";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/reducer/cartReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import { _LIMIT } from "@/contants/general";

const InputRange = ({ ...props }) => {
  const { updateQueryString, queryObject } = props || {};
  const { minPrice, maxPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const min = 0;
  const max = 60000;
  const step = 1000;
  const refMin = useRef();
  const refMax = useRef();
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minPos = parseInt(((minPrice - min) / (max - min)) * 100);
  const maxPos = parseInt(((maxPrice - min) / (max - min)) * 100);
  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(e.target.value, maxPrice - step);
    // setMinValue(newMinVal);
    dispatch(cartActions.setMinPrice(newMinVal));
  };
  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(e.target.value, minPrice + step);
    dispatch(cartActions.setMaxPrice(newMaxVal));
    // setMaxValue(newMaxVal);
  };
  return (
    <>
      <div className="range mt-[20px] ">
        <div className="slider overflow-x-hidden">
          <div
            className={twMerge(`progress  `)}
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          ></div>
        </div>
        <div className={`range-input left-[${minPos}]`}>
          <input
            ref={refMin}
            type="range"
            className="range-min"
            min={min}
            max={max}
            step={step}
            value={minPrice}
            onChange={handleMinChange}
          />
          <input
            ref={refMax}
            type="range"
            className="range-max"
            min={min}
            max={max}
            step={step}
            value={maxPrice}
            onChange={handleMaxChange}
          />
        </div>
        <div className="price-input  flex items-center mt-[20px] gap-2 flex-wrap xl:flex-nowrap">
          <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[4px]">
            <div className="font-om flex items-center justify-start flex-wrap gap-1">
              Giá:
              <p
                className="price-min  min-h-[30px] text-black-333 
              text-sm  tracking-wider flex items-center"
              >
                {formatPriceVND(minPrice * 1000)}
              </p>
              -
              <p
                className="price-min  min-h-[30px] text-black-333 
              text-sm  tracking-wider flex items-center"
              >
                {formatPriceVND(maxPrice * 1000)}
              </p>
            </div>
            <div
              className={`relative cursor-pointer font-ossb text-sm  capitalize flex 
            items-center justify-center gap-[4px] group hover:text-primary duration-300 transition-all  group underline`}
              onClick={() => {
                updateQueryString({
                  ...queryObject,
                  page: 0,
                  limit: _LIMIT,
                  priceStart: minPrice * 1000,
                  priceEnd: maxPrice * 1000,
                });
              }}
            >
              <div>
                <svg className="h-[14px] w-[14px]" viewBox="0 0 128 128">
                  <polygon
                    className="duration-300 group-hover:fill-primary fill-black-555"
                    points="2.498 9.202 2.498 13.468 51.921 75.247 53.704 75.247 53.704 118.798 74.296 102.598 74.296 75.247 76.079 75.247 125.502 13.468 125.502 9.202 2.498 9.202"
                  ></polygon>
                </svg>
              </div>
              <p className="text-sm">Chọn giá</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputRange;

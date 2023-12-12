import React, { useRef, useState } from "react";
import Button from "../Button";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/reducer/cartReducer";

const InputRange = ({ ...props }) => {
  const { updateQueryString, queryObject } = props || {};
  const { minPrice, maxPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const milion = 1000000;
  const min = 0;
  const max = 60000;
  const step = 1000;
  const refMin = useRef();
  const refMax = useRef();
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minPos = parseInt(((minValue - min) / (max - min)) * 100);
  const maxPos = parseInt(((maxValue - min) / (max - min)) * 100);
  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(e.target.value, maxValue - step);
    setMinValue(newMinVal);
  };
  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(e.target.value, minValue + step);
    setMaxValue(newMaxVal);
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
            value={minValue}
            onChange={handleMinChange}
          />
          <input
            ref={refMax}
            type="range"
            className="range-max"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>
        <div className="price-input  flex items-center mt-[26px] gap-2 flex-wrap xl:flex-nowrap">
          <div className="flex items-center justify-center gap-1">
            <p className="font-osr text-md w-fit ">$</p>
            <p
              className="price-min border-solid border border-[#e5e5e5] rounded-[4px] 
                 min-w-[60px] min-h-[30px]
                text-black-333 text-sm font-osr flex items-center justify-center "
            >
              {minValue}
            </p>
            <p className="w-[5px] h-[1px] mx-[2px] bg-black-555"></p>
            <p
              className="price-max border-solid border border-[#e5e5e5] rounded-[4px] 
                 min-w-[60px] min-h-[30px]
                text-black-333 text-sm font-osr flex items-center justify-center "
            >
              {maxValue}
            </p>
          </div>
          <Button
            onClick={() => {
              dispatch(cartActions.setMinPrice(minValue));
              dispatch(cartActions.setMaxPrice(maxValue));
              updateQueryString({
                ...queryObject,
                priceStart: minValue * 1000,
                priceEnd: maxValue * 1000,
              });
            }}
            className={`rounded-[4px] md:text-[13px] max-h-[30px] md:p-[6px_10px]`}
          >
            Filter
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputRange;

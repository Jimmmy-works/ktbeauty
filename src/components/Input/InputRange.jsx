import React, { useState } from "react";
import Button from "../Button";
import { twMerge } from "tailwind-merge";

const InputRange = () => {
  const min = 0;
  const max = 10000;
  const step = 20;
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
            type="range"
            className="range-min"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={handleMinChange}
          />
          <input
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
          <div className="flex items-center gap-1">
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
          <Button className={`rounded-[4px] xl:py-[4.5px] xl:px-[15.55px]  `}>
            FILTER
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputRange;

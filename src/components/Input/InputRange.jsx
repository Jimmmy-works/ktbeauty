import React, { useState } from "react";
import Button from "../Button";
import { twMerge } from "tailwind-merge";

const InputRange = () => {
  const min = 0;
  const max = 10000;
  const step = 1000;
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minPos = parseInt(((minValue - min) / (max - min)) * 100);
  const maxPos = parseInt(((maxValue - min) / (max - min)) * 100);
  console.log("minPos", minPos);
  console.log("maxPos", maxPos);
  console.log("minValue", minValue);
  console.log("maxValue", maxValue);
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
        <div className="price-input flex items-center mt-[26px]  gap-1   ">
          <p className="font-mar text-md w-fit ">$</p>
          <p
            className="price-min border-solid border border-[#e5e5e5] rounded-[4px] px-[10px]
              py-[5px] min-w-[60px] min-h-[30px]
              text-black-333 text-sm font-mar flex items-center justify-center "
          >
            {minValue}
          </p>
          <p className="w-[5px] h-[1px] mx-[5px] bg-black-555"></p>
          <p
            className="price-max border-solid border border-[#e5e5e5] rounded-[4px] px-[10px]
              py-[5px] min-w-[60px] min-h-[30px]
              text-black-333 text-sm font-mar flex items-center justify-center "
          >
            {maxValue}
          </p>
          <Button
            variant="filled"
            className={`rounded-[4px] py-[5.5px] px-[16.55px] ml-[6px]`}
          >
            FILTER
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputRange;

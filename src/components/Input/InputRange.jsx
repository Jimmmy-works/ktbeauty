import { _LIMIT } from "@/contants/general";
import { cartActions } from "@/store/reducer/cartReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
const InputRangeStyle = styled.div`
  .range {
    .slider {
      height: 5px;
      position: relative;
      background: #ddd;
      border-radius: 5px;
      .progress {
        height: 100%;
        position: absolute;
        border-radius: 5px;
        background: #ff887b;
      }
    }
    &-input {
      position: relative;
    }
    input[type="range"] {
      position: absolute;
      width: 100%;
      height: 5px;
      top: -5px;
      background: none;
      pointer-events: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      height: 17px;
      width: 17px;
      border-radius: 5px;
      background: ${({ loadingrange }) =>
        loadingrange === "true" ? `#d9d9d9 ` : `#ff887b !important`};
      pointer-events: ${(loadingrange) =>
        loadingrange === "true" ? `none` : `auto`};
      -webkit-appearance: none;
      box-shadow: 0 0 6px rgba(248, 220, 220, 0.5);
      cursor: pointer;
      transition: all 0.3s;
    }
    input[type="range"]::-moz-range-thumb {
      height: 17px;
      width: 17px;
      border-radius: 5px;
      background: ${({ loadingrange }) =>
        loadingrange === "true" ? `#d9d9d9 ` : `#ff887b !important`};
      pointer-events: ${(loadingrange) =>
        loadingrange === "true" ? `none` : `auto`};
      -webkit-appearance: none;
      box-shadow: 0 0 6px rgba(248, 220, 220, 0.5);
      cursor: pointer;
      transition: all 0.3s;
    }
  }
`;
const InputRange = ({ ...props }) => {
  const { updateQueryString, queryObject, loadingDataShop } = props || {};
  const { minPrice, maxPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const min = 0;
  const max = 60000;
  const step = 1000;
  const refMin = useRef();
  const refMax = useRef();
  // const [minValue, setMinValue] = useState(min);
  // const [maxValue, setMaxValue] = useState(max);
  const minPos = parseInt(((minPrice - min) / (max - min)) * 100);
  const maxPos = parseInt(((maxPrice - min) / (max - min)) * 100);
  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(e.target.value, maxPrice - step);
    if (!loadingDataShop) {
      dispatch(cartActions.setMinPrice(newMinVal));
    }
    // setMinValue(newMinVal);
  };
  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(e.target.value, minPrice + step);
    if (!loadingDataShop) {
      dispatch(cartActions.setMaxPrice(newMaxVal));
    }
    // setMaxValue(newMaxVal);
  };
  return (
    <InputRangeStyle loadingrange={loadingDataShop?.toString()}>
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
            className={`range-min duration-300 transition-colors ${
              loadingDataShop ? "bg-[#d9d9d9]" : ""
            }`}
            min={min}
            max={max}
            step={step}
            value={minPrice}
            onChange={handleMinChange}
          />
          <input
            ref={refMax}
            type="range"
            className={`range-max duration-300 transition-colors ${
              loadingDataShop ? "bg-[#d9d9d9]" : ""
            }`}
            min={min}
            max={max}
            step={step}
            value={maxPrice}
            onChange={handleMaxChange}
          />
        </div>
        <div className="price-input  flex items-center mt-[20px] gap-2 flex-wrap xl:flex-nowrap">
          <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[4px]">
            <div
              className={`font-om flex items-center justify-start flex-wrap gap-1 ${
                loadingDataShop ? "text-[#d9d9d9]" : "text-black-333"
              } duration-300 transition-all`}
            >
              Giá:
              <p
                className={`price-min  min-h-[30px] 
              text-sm  tracking-wider flex items-center ${
                loadingDataShop ? "text-[#d9d9d9]" : "text-black-333"
              } duration-300 transition-all`}
              >
                {formatPriceVND(minPrice * 1000)}
              </p>
              -
              <p
                className={`price-min  min-h-[30px] 
              text-sm  tracking-wider flex items-center ${
                loadingDataShop ? "text-[#d9d9d9]" : "text-black-333"
              } duration-300 transition-all`}
              >
                {formatPriceVND(maxPrice * 1000)}
              </p>
            </div>
            <div
              className={`relative cursor-pointer font-ossb text-sm  capitalize flex 
            items-center justify-center gap-[4px] group hover:text-primary duration-300 transition-all  group underline
            ${loadingDataShop ? "text-[#d9d9d9]" : "text-black-555"}`}
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
                    className={`duration-300 group-hover:fill-primary  ${
                      loadingDataShop ? "fill-[#d9d9d9]" : "fill-black-555"
                    } duration-300 transition-all`}
                    points="2.498 9.202 2.498 13.468 51.921 75.247 53.704 75.247 53.704 118.798 74.296 102.598 74.296 75.247 76.079 75.247 125.502 13.468 125.502 9.202 2.498 9.202"
                  ></polygon>
                </svg>
              </div>
              Chọn giá
            </div>
          </div>
        </div>
      </div>
    </InputRangeStyle>
  );
};

export default InputRange;

import React, { forwardRef, useState } from "react";

const QuantityInputM = (
  {
    min = 1,
    max = 10,
    step = 1,
    value,
    onChange,
    onBlur,
    type,
    className,
    loading = false,
    ...quantityInputProps
  },
  ref
) => {
  const [renderValue, setRenderValue] = useState(value || 1);
  const onInputBlur = (e) => {
    const value = modifyValue(Number(e.target.value));
    setRenderValue(value);
    onChange?.(value);
  };
  const onInputOnchange = (e) => {
    setRenderValue(Number(e.target.value));
  };
  const onIncrease = () => {
    const value = modifyValue(Number(renderValue) + Number(step));
    if (!loading && renderValue < 20) {
      setRenderValue(value);
      onChange?.(value);
    }
  };
  const onDecrease = () => {
    const value = modifyValue(Number(renderValue) - Number(step));
    if (!loading && renderValue > 1) {
      setRenderValue(value);
      onChange?.(value);
    }
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
  return (
    <>
      <div
        className={`px-[10px]  h-full flex items-center justify-center group/hover
        ${
          loading || renderValue <= min
            ? " cursor-not-allowed"
            : "cursor-pointer pointer-events-auto"
        }
       duration-300 transition-all `}
        onClick={onDecrease}
      >
        <svg className="h-[10px] w-[10px]" viewBox="0 0 24 24">
          <path
            className={`${
              loading || renderValue <= min
                ? "fill-[#e5e5e5]"
                : "fill-black-555 group-hover/hover:fill-primary"
            } duration-300 transition-all `}
            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
          ></path>
        </svg>
      </div>
      <input
        className={`w-[30px] text-15px tracking-wider text-center font-osb ${
          loading
            ? "text-[#e5e5e5] cursor-not-allowed"
            : "text-black-555 cursor-auto pointer-events-auto"
        } duration-300 transition-all`}
        type="number"
        ref={ref}
        min={min}
        max={max}
        value={renderValue}
        onChange={loading ? null : onInputOnchange}
        onBlur={loading ? null : onInputBlur}
        {...quantityInputProps}
      />
      <div
        className={`px-[10px]  h-full flex items-center justify-center group/hover
        ${
          loading || renderValue >= max
            ? "cursor-not-allowed"
            : "cursor-pointer pointer-events-auto"
        }
        duration-300 transition-all`}
        onClick={onIncrease}
      >
        <svg className="h-[10px] w-[10px] rotate-[180deg]" viewBox="0 0 24 24">
          <path
            className={`${
              loading || renderValue >= max
                ? "fill-[#e5e5e5] "
                : "fill-black-555 group-hover/hover:fill-primary "
            } duration-300 transition-all `}
            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
          ></path>
        </svg>
      </div>
    </>
  );
};
const QuantityInput = forwardRef(QuantityInputM);

export default QuantityInput;

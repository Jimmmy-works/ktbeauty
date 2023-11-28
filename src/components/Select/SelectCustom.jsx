import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const SelectCustom = ({
  data,
  onChangeSort,
  defaultTitle,
  className,
  padding,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [valueOption, setValueOption] = useState("");
  const [titleSelect, setTitleSelect] = useState("");
  const onDropdown = (e) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };
  const onSelectOption = (name, e) => {
    setValueOption(name);
    onChangeSort(name);
    setTitleSelect(e.target.innerText);
    setDropdown(false);
  };
  document.addEventListener("click", function () {
    setDropdown(false);
  });
  return (
    <div
      className={twMerge(`h-full relative z-50 min-w-[160px]  ${className}`)}
    >
      <div className="absolute right-2 top-1/2 -translate-y-1/2  ">
        <svg className="w-[8px] h-[8px]" viewBox="0 0 24 24">
          <path
            fill="#333"
            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
          ></path>
        </svg>
      </div>
      <div
        className={twMerge(`border border-solid border-[#e5e5e5]  
                  cursor-pointer p-[10px] text-sm text-black-333 font-osr  capitalize ${
                    padding ?? ""
                  }`)}
        onClick={onDropdown}
      >
        {titleSelect || defaultTitle || data?.[0]?.label}
      </div>
      <ul
        className={` absolute top-[100%] duration-300 transition-all w-full z-[100] 
        max-h-[250px]
      ${
        dropdown ? " opacity-100 visible" : "opacity-0 invisible "
      } overflow-y-scroll`}
      >
        {data?.length &&
          data?.map((item) => {
            return (
              <li
                className="pt-[10px] font-osr text-sm leading-[20px] cursor-pointer text-black-333 
                  bg-grey-f7f6 p-[10px] hover:bg-gray-200 duration-300 transition-all"
                value={item?.value}
                key={item?.name}
                onClick={(e) => onSelectOption(item?.name, e)}
              >
                {item?.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SelectCustom;

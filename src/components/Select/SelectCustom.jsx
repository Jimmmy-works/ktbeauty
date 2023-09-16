import React, { useState } from "react";

const SelectCustom = () => {
  const [dropdown, setDropdown] = useState(false);
  const [valueOption, setValueOption] = useState("");
  const [titleSelect, setTitleSelect] = useState("");
  const onDropdown = (e) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };
  const onSelectOption = (e) => {
    setValueOption(e.target.value);
    setTitleSelect(e.target.innerText);
    setDropdown(false);
  };
  document.addEventListener("click", function () {
    setDropdown(false);
  });
  return (
    <div className="h-full relative z-50">
      <div className="absolute right-2 top-1/2 -translate-y-1/2  ">
        <svg className="w-[8px] h-[8px]" viewBox="0 0 24 24">
          <path
            fill="#333"
            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
          ></path>
        </svg>
      </div>
      <div
        className="border border-solid border-[#e5e5e5]  
                  cursor-pointer p-[10px] text-sm text-black-333 font-osr min-w-[160px] "
        onClick={onDropdown}
      >
        {titleSelect || `Sort By Popularity`}
      </div>
      <ul
        className={` absolute top-[100%] duration-300 transition-all w-full z-[100]
      ${dropdown ? " opacity-100 visible" : "opacity-0 invisible "}`}
      >
        <li
          className=" text-sm text-black-333 font-osr  leading-[20px] cursor-pointer
                  bg-grey-f7f6 p-[10px] hover:bg-gray-200 duration-300 transition-all"
          value={`1`}
          onClick={onSelectOption}
        >
          Sort By Popularity
        </li>
        <li
          className="pt-[10px] font-osr text-sm leading-[20px] cursor-pointer text-black-333 
                  bg-grey-f7f6 p-[10px] hover:bg-gray-200 duration-300 transition-all"
          value={`2`}
          onClick={onSelectOption}
        >
          Sort By Old
        </li>
        <li
          className="pt-[10px] font-osr text-sm leading-[20px] cursor-pointer text-black-333 
                  bg-grey-f7f6 p-[10px] hover:bg-gray-200 duration-300 transition-all"
          value={`3`}
          onClick={onSelectOption}
        >
          Sort By Newest
        </li>
        <li
          className="pt-[10px] font-osr text-sm leading-[20px] cursor-pointer text-black-333 
                  bg-grey-f7f6 p-[10px] hover:bg-gray-200 duration-300 transition-all"
          value={`4`}
          onClick={onSelectOption}
        >
          Sort By High Price
        </li>
        <li
          className="pt-[10px] font-osr text-sm leading-[20px] cursor-pointer text-black-333 
                  bg-grey-f7f6 p-[10px] hover:bg-gray-200 duration-300 transition-all"
          value={`5`}
          onClick={onSelectOption}
        >
          Sort By Lower Price
        </li>
      </ul>
    </div>
  );
};

export default SelectCustom;

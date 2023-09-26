import React, { useEffect } from "react";
import Accordion from "./Accordion";
import useWindowSize from "@/utils/windowResize";
import InputRange from "./Input/InputRange";

const NavbarFilter = ({ onToggleFilter, options, isFilter, setIsFilter }) => {
  const { width } = useWindowSize();
  useEffect(() => {
    if (width >= 1024) {
      setIsFilter(false);
    }
  }, [width]);
  console.log("options", options);
  return (
    <div
      className={`fixed h-screen w-screen bg-white top-0 left-0 z-[10000] transition-all duration-[400ms] ease-linear
    ${isFilter ? " visible translate-x-0" : " invisible -translate-x-[100%]"}`}
    >
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex justify-between items-center w-full py-[20px] px-[30px]">
          <p className="font-osr md:text-[16px] xs:text-sm text-black-555  p-3">
            Delete Filter
          </p>
          <div
            className="flex items-center  p-2 cursor-pointer"
            onClick={onToggleFilter}
          >
            <p className="font-osr md:text-[16px] xs:text-sm text-black-555 ">
              Close
            </p>
            <svg
              className="md:w-[24px] xs:md:w-[18px] md:h-[24px] xs:md:h-[18px] "
              viewBox="0 0 24 24"
            >
              <path
                fill="#555"
                d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full p-[20px] flex flex-col">
          {options?.map((item, index) => {
            return (
              <Accordion key={`${item}${index}`} item={item} index={index} />
            );
          })}
          <div className="mt-[40px]">
            <InputRange />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarFilter;

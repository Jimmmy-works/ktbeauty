import React, { useEffect } from "react";
import Accordion from "./Accordion";
import useWindowSize from "@/utils/windowResize";
import InputRange from "./Input/InputRange";
import AccordionM from "@/components/Accordion/index.jsx";

const NavbarFilter = ({
  onToggleFilter,
  data,
  isFilter,
  setIsFilter,
  children,
  onChangeCategoryTab,
  categoryTab,
}) => {
  const { width } = useWindowSize();
  useEffect(() => {
    if (width >= 1024) {
      setIsFilter(false);
    }
  }, [width]);
  return (
    <div
      className={`fixed h-screen w-screen bg-white top-0 left-0 z-[10000] transition-all duration-[400ms] ease-linear
    ${isFilter ? " visible translate-x-0" : " invisible -translate-x-[100%]"}`}
    >
      <div className="flex flex-col items-center h-full w-full">
        <div className=" w-full p-[20px_20px_10px_20px] ">
          <div
            className="flex items-center justify-end  p-2 cursor-pointer border-b border-solid border-[#c4c2c2]"
            onClick={onToggleFilter}
          >
            <p className="font-osr md:text-[16px] xs:text-sm text-black-555 ">
              Close
            </p>
            <svg
              className="md:w-[24px] xs:w-[18px] md:h-[24px] xs:h-[18px] "
              viewBox="0 0 24 24"
            >
              <path
                fill="#555"
                d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
              />
            </svg>
          </div>
        </div>

        {children}

        <div className="w-full px-[20px] flex flex-col">
          <AccordionM
            onChangeCategoryTab={onChangeCategoryTab}
            heading={`Danh mục sản phẩm`}
            data={data}
          />
          <AccordionM
            heading={`Lọc sản phảm theo giá`}
            renderProps={() => <InputRange />}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarFilter;

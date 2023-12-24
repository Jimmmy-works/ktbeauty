import useWindowSize from "@/utils/windowResize";
import { useEffect } from "react";
import Accordion from "./Accordion";
import InputRange from "./Input/InputRange";
import { Collapse } from "antd";

const NavbarFilter = ({
  onToggleFilter,
  categories,
  isFilter,
  setIsFilter,
  children,
  itemCategories,
  onChangeCollapse,
}) => {
  const { width } = useWindowSize();
  useEffect(() => {
    if (width >= 1024) {
      setIsFilter(false);
    }
  }, [width]);
  return (
    <>
      <div
        onClick={onToggleFilter}
        className={`fixed h-screen w-screen z-[1000] bg-[rgba(0,0,0,0.3)] top-0 left-0
         transition-all duration-[400ms] 
        ${isFilter ? " visible opacity-100" : " invisible opacity-0"} `}
      ></div>
      <div
        className={`nav-filter fixed h-[calc(75%)] rounded-xl w-screen bg-white bottom-0 left-0 z-[1001]
         transition-all duration-[400ms] 
        ${
          isFilter ? " visible translate-y-0" : " invisible translate-y-[100%]"
        } `}
      >
        <div className="flex flex-col items-center h-full w-full">
          <div className=" w-full p-[10px_20px_10px_20px] ">
            <div
              className="relative flex items-center justify-end  p-2 cursor-pointer border-b border-solid border-[#c4c2c2]"
              onClick={onToggleFilter}
            >
              <h3 className="center-absolute text-md text-black-333 font-ossb">
                Bộ lọc
              </h3>
              <p className="font-osr leading-[18px] md:text-[16px] xs:text-sm text-black-555 ">
                Close
              </p>
              <svg
                className="md:w-[24px] xs:w-[18px]  md:h-[24px] xs:h-[18px] "
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
          <div className="w-full mt-[20px] px-[20px] flex flex-col overflow-y-scroll">
            <Collapse
              onChange={onChangeCollapse}
              className="my-antd-accordion"
              expandIconPosition={"end"}
              expandIcon={({ isActive }) => {
                return (
                  <div
                    className={`rounded-[50%] bg-[#f9f9f9] p-[9px] transition-all duration-400 ${
                      isActive ? "rotate-[-90deg]" : "rotate-[-180deg]"
                    }`}
                    rotate={isActive ? 90 : 0}
                  >
                    <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24">
                      <path
                        className="fill-black-333"
                        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                      ></path>
                    </svg>
                  </div>
                );
              }}
              defaultActiveKey={["1", "2"]}
              ghost
              items={itemCategories}
            />
            {/* <Accordion
                onChangeFilter={setSelectedFilters}
                onChangeCategoryTab={onChangeCategoryTab}
                heading={`Danh mục sản phẩm`}
                data={categories}
              />
              <Accordion
                heading={`Lọc sản phảm theo giá`}
                renderProps={(props) => {
                  return <InputRange {...props} />;
                }}
              /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFilter;

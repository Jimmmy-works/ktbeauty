import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useShop from "./useShop";
import SelectCustom from "@/components/Select/SelectCustom";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import NavbarFilter from "@/components/NavbarFilter";
import useWindowSize from "@/utils/windowResize";
import InputRange from "@/components/Input/InputRange";
import Accordion from "@/components/Accordion/index.jsx";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import { Tooltip } from "antd";
import { CATEGORIES_OPTIONS } from "@/contants/general";

const Shop = () => {
  const {
    // min,
    // max,
    // onChangeMax,
    // onChangeMin,
    isFilter,
    onToggleFilter,
    setIsFilter,
    categories,
    products,
    statusGetProduct,
    imageloading,
    onImageLoading,
    addToCart,
    onChangeCategoryTab,
    categoryTab,
  } = useShop();
  const filterMobileProps = {
    onChangeCategoryTab,
    categoryTab,
  };
  const { width } = useWindowSize();
  const [filterList, setFilterList] = useState([CATEGORIES_OPTIONS.ALL]);
  const [renderFilter, setRenderFiliter] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const onClearFilter = () => {
    setFilterList([CATEGORIES_OPTIONS.ALL]);
    setCurrentFilter("");
    setRenderFiliter([]);
  };
  const filterCategories = useMemo(() => {
    const findList = filterList.indexOf(categoryTab);
    switch (findList) {
      case -1:
        setFilterList([...filterList, categoryTab]);
      case 0:
        return;
      default:
        break;
    }
  }, [categoryTab]);
  const filterAll = () => {
    return products?.filter((item) => {
      return item?.category_id?.name === currentFilter;
    });
  };
  // const filterTest = useMemo(() => {
  //   const findList = filterList.includes(categoryTab);
  //   console.log("findList", findList);
  //   switch (findList) {
  //     case findList:
  //       setCurrentFilter(categoryTab);
  //       setRenderFiliter([...filterAll, filterAll()]);
  //     // setRenderFiliter([...filterList, categoryTab]);

  //     default:
  //       break;
  //   }
  // }, [filterList, categoryTab]);
  const filterFace = products?.filter((item) => {
    if (categoryTab === CATEGORIES_OPTIONS.FACE) {
      return item?.category_id?.name === CATEGORIES_OPTIONS.FACE;
    }
  });
  const filterSkin = products?.filter((item) => {
    if (categoryTab === CATEGORIES_OPTIONS.FACE) {
      return item?.category_id?.name === CATEGORIES_OPTIONS.SKIN;
    }
  });
  const filterBody = products?.filter((item) => {
    if (categoryTab === CATEGORIES_OPTIONS.FACE) {
      return item?.category_id?.name === CATEGORIES_OPTIONS.BODY;
    }
  });
  const filterSupplement = products?.filter((item) => {
    if (categoryTab === CATEGORIES_OPTIONS.FACE) {
      return item?.category_id?.name === CATEGORIES_OPTIONS.SUPPLEMENT;
    }
  });
  const filterOther = products?.filter((item) => {
    if (categoryTab === CATEGORIES_OPTIONS.FACE) {
      return item?.category_id?.name === CATEGORIES_OPTIONS.OTHER;
    }
  });

  useEffect(() => {
    let newList = [];
    const findCategory = filterList?.find((item) => {
      return item;
    });
    // const filterProducts = filterList?.filter((item) => {
    //   return filterList.indexOf(categoryTab) !== -1;
    // });
    // console.log("filterProducts", filterProducts);
  }, [categoryTab]);
  return (
    <main className="main-wrapper">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={`${PATHS.HOME}`}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>
          <Link>Sản phẩm</Link>
        </BreadCrumb.Item>
      </BreadCrumb>

      <div className="container flex lg:flex-row xs:flex-col gap-[30px]">
        <aside
          className="sidebar-shop xs:w-full xl:max-w-[265px]  xl:w-1/4 border-r-[5px] 
        border-solid border-[#e5e5e5] xl:block xs:hidden"
        >
          <div className=" lg:pr-[18.4px] xs:flex gap-4 lg:block">
            <Accordion
              heading={`Danh mục sản phẩm`}
              onChangeCategoryTab={onChangeCategoryTab}
              data={categories}
            />
            <Accordion
              heading={`Lọc sản phảm theo giá`}
              renderProps={() => {
                return <InputRange />;
              }}
            />
          </div>
        </aside>

        <div className="w-full ">
          <div
            className="flex xl:items-center md:items-start  justify-between xs:py-[16px] md:py-[24px] mb-[30px] border-b 
          border-solid border-[#e5e5e5]"
          >
            <div className=" flex xl:items-center md:items-start gap-5">
              <h2 className="font-mab text-md leading-[30px] text-black-333 uppercase">
                Shop
              </h2>
              {width >= 1280 && filterList?.length > 0 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <ul className=" flex items-center justify-center gap-2 flex-wrap">
                    {filterList?.map((item, index) => {
                      return (
                        <Tooltip
                          key={`${item}${index}`}
                          placement={`top`}
                          color="#999"
                          title={`Bỏ filter ${item}`}
                        >
                          <li
                            className="cursor-pointer font-om text-white text-sm bg-primary border-solid
                     border-primary border p-[7px_13px] uppercase"
                          >
                            {item}
                          </li>
                        </Tooltip>
                      );
                    })}
                  </ul>
                  {filterList?.length && (
                    <button
                      onClick={onClearFilter}
                      className="cursor-pointer font-om text-black-333 text-sm bg-[#e5e5e5] border-solid
                     border-[#e5e5e5] border p-[5px_13px] uppercase"
                    >
                      Clear filter
                    </button>
                  )}
                </div>
              )}
            </div>
            {width < 1280 && (
              <div
                className="flex items-center  gap-2 p-2 bg-black-be rounded-[20px]"
                onClick={onToggleFilter}
              >
                <svg
                  className="rotate-[90deg] w-[16px] h-[16px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 8c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-10 6c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm10-8c.343 0 .677.035 1 .101v-2.101c0-.552-.447-1-1-1s-1 .448-1 1v2.101c.323-.066.657-.101 1-.101zm-10 6c.343 0 .677.035 1 .101v-8.101c0-.552-.447-1-1-1s-1 .448-1 1v8.101c.323-.066.657-.101 1-.101zm10 4c-.343 0-.677-.035-1-.101v8.101c0 .552.447 1 1 1s1-.448 1-1v-8.101c-.323.066-.657.101-1 .101zm-10 6c-.343 0-.677-.035-1-.101v2.101c0 .552.447 1 1 1s1-.448 1-1v-2.101c-.323.066-.657.101-1 .101z" />
                </svg>
                <p className="text-sm font-osr font-medium text-black-333">
                  Filter
                </p>
              </div>
            )}
            <NavbarFilter
              {...filterMobileProps}
              data={categories}
              isFilter={isFilter}
              onToggleFilter={onToggleFilter}
              setIsFilter={setIsFilter}
            >
              {width < 1280 && filterList?.length > 0 && (
                <div className="flex w-full p-[20px_20px_0_20px]  gap-4 flex-wrap">
                  <ul className=" flex w-full   gap-2 flex-wrap">
                    {filterList?.map((item, index) => {
                      return (
                        <Tooltip
                          key={`${item}${index}`}
                          placement={`top`}
                          color="#999"
                          title={`Bỏ filter ${item}`}
                        >
                          <li
                            className="cursor-pointer font-om text-white text-sm bg-primary border-solid
                     border-primary border p-[7px_13px] uppercase"
                          >
                            {item}
                          </li>
                        </Tooltip>
                      );
                    })}
                  </ul>
                  {filterList?.length && (
                    <button
                      onClick={onClearFilter}
                      className="cursor-pointer font-om text-black-333 text-sm bg-[#e5e5e5] border-solid
                     border-[#e5e5e5] border p-[5px_13px] uppercase"
                    >
                      Clear filter
                    </button>
                  )}
                </div>
              )}
            </NavbarFilter>
            <div className=" gap-2 items-center xs:hidden xl:flex">
              <label className="font-osl text-black-333 text-sm">Sort:</label>
              <SelectCustom />
            </div>
          </div>
          <div
            className="flex items-center flex-wrap  xs:gap-y-[20px] xs:gap-x-[14px] md:gap-[20px] 
          lg:gap-[30px] mb-[30px]"
          >
            {statusGetProduct === THUNK_STATUS.fulfilled ? (
              products?.length &&
              products.map((item) => {
                return (
                  <ProductCard
                    onLoadingImage={onImageLoading}
                    imageloading={imageloading}
                    key={`${item?._id}`}
                    className={` xs:w-[calc(50%-7px)] md:w-[calc(50%-10px)] lg:w-[calc(33.333333%-20px)]`}
                    item={item}
                    isProductDetail={true}
                    addToCart={addToCart}
                  />
                );
              })
            ) : (
              <div className="w-full flex flex-wrap gap-[10px]">
                <LoadingSkeleton
                  isClassName={`mb-[30px] xs:w-[calc(50%-7px)] md:w-[calc(50%-10px)] lg:w-[calc(33.33333%-20px)]`}
                  isLoading={imageloading}
                  isParagraph={2}
                  isArray={9}
                />
              </div>
            )}
          </div>
          {/* ) : ( */}
          {/* <LoadingSkeleton
              isClassName={`mb-[30px]`}
              isImageStyle={{ height: "350px" }}
              isLoading={statusGetProduct}
              isParagraph={5}
              isArray={1}
            /> */}
          {/* )} */}
          <Pagination />
        </div>
      </div>
    </main>
  );
};

export default Shop;

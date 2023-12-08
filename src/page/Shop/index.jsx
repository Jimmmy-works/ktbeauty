import Accordion from "@/components/Accordion/index.jsx";
import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import InputRange from "@/components/Input/InputRange";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import NavbarFilter from "@/components/NavbarFilter";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SelectCustom from "@/components/Select/SelectCustom";
import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import useWindowSize from "@/utils/windowResize";
import { Empty, Tooltip } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useShop from "./useShop";
const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  .ant-empty-image {
    width: 150px !important;
    height: 150px !important;
    svg {
    }
  }
`;
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
    onAddToCart,
    onChangeCategoryTab,
    categoryTab,
    customCategories,
    onFilterButtonClick,
    selectedFilters,
    filteredItems,
    setSelectedFilters,
    optionSort,
    onChangeFeaturedTab,
    onChangePageCurrent,
    pageCurrent,
    findCategoryAll,
    totalProducts,
    totalPage,
  } = useShop();
  const filterMobileProps = {
    onChangeCategoryTab,
    categoryTab,
    setSelectedFilters,
    isFilter,
    onToggleFilter,
    categories,
    setIsFilter,
  };
  const { width } = useWindowSize();
  const handleClearSelectedFilters = () => {
    setSelectedFilters([findCategoryAll?._id]);
  };
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
              onChangeFilter={setSelectedFilters}
              data={categories}
            />
            <Accordion
              heading={`Lọc theo giá`}
              renderProps={(props) => {
                return <InputRange {...props} />;
              }}
            ></Accordion>
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
              {width >= 1280 && customCategories?.length > 0 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <ul className=" flex items-center justify-center gap-2 flex-wrap">
                    {customCategories?.map((category, index) => {
                      return (
                        <Tooltip
                          key={`${category?._id}${index}`}
                          placement={`top`}
                          color="#999"
                          title={`Bỏ filter ${category?.name}`}
                        >
                          <li
                            className="cursor-pointer font-om text-white text-sm 
                            uppercase"
                            onClick={() => onFilterButtonClick(category?._id)}
                          >
                            <Button
                              className={`capitalize md:py-[6px] md:px-[20px]  `}
                              key={`filter-${category?._id}`}
                              isActive={
                                selectedFilters?.includes(category?._id)
                                  ? true
                                  : false
                              }
                              variant="outline"
                            >
                              {category?.name}
                            </Button>
                          </li>
                        </Tooltip>
                      );
                    })}
                    {/* <Button
                      onClick={handleClearSelectedFilters}
                      className={`capitalize md:py-[6px] md:px-[20px]  `}
                      isActive={!selectedFilters?.length ? true : false}
                      variant="outline"
                    >
                      All
                    </Button> */}
                    <Button
                      onClick={handleClearSelectedFilters}
                      variant="outline"
                      className={`bg-black-ebe border-black-ebe text-black-333 capitalize 
                      md:py-[6px] md:px-[20px]  `}
                    >
                      Clear
                    </Button>
                  </ul>
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
            <NavbarFilter {...filterMobileProps}>
              {width < 1280 && customCategories?.length > 0 && (
                <div className="flex w-full p-[20px_20px_0_20px]  gap-4 flex-wrap">
                  <ul className=" flex w-full items-center  gap-2 flex-wrap">
                    {customCategories?.map((category, index) => {
                      return (
                        <Tooltip
                          key={`${category?._id}${index}`}
                          placement={`top`}
                          color="#999"
                          title={`Bỏ filter ${category?.name}`}
                        >
                          <li
                            className="cursor-pointer font-om text-white text-sm 
                            uppercase"
                            onClick={() => onFilterButtonClick(category?._id)}
                          >
                            <Button
                              className={`capitalize md:py-[6px] md:px-[20px]  `}
                              key={`filter-${category?._id}`}
                              isActive={
                                selectedFilters?.includes(category?._id)
                                  ? true
                                  : false
                              }
                              variant="outline"
                            >
                              {category?.name}
                            </Button>
                          </li>
                        </Tooltip>
                      );
                    })}
                    <Button
                      className={`capitalize md:py-[6px] md:px-[20px] `}
                      isActive={!selectedFilters?.length ? true : false}
                      variant="outline"
                    >
                      All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFilters([])}
                      className="cursor-pointer font-om text-black-333 text-sm bg-[#e5e5e5] border-solid
                     border-[#e5e5e5] border p-[5px_13px]  md:py-[6px] md:px-[20px]"
                    >
                      Clear
                    </Button>
                  </ul>
                </div>
              )}
            </NavbarFilter>
            <div className=" gap-2 items-center xs:hidden xl:flex">
              <SelectCustom
                defaultTitle={`Tất cả`}
                onChangeSort={onChangeFeaturedTab}
                data={optionSort}
              />
            </div>
          </div>
          <div
            className="flex items-center flex-wrap  xs:gap-y-[20px] xs:gap-x-[14px] md:gap-[20px] 
          lg:gap-[30px] mb-[30px]"
          >
            {statusGetProduct === THUNK_STATUS.fulfilled ? (
              products?.length ? (
                products?.map((item) => {
                  return (
                    <ProductCard
                      onLoadingImage={onImageLoading}
                      imageloading={imageloading}
                      key={`${item?._id}`}
                      className={` xs:w-[calc(50%-7px)] md:w-[calc(50%-10px)] lg:w-[calc(33.333333%-20px)]`}
                      item={item}
                      isProductDetail={true}
                      onAddToCart={onAddToCart}
                    />
                  );
                })
              ) : (
                <EmptyWrapper>
                  <Empty description={false} />
                </EmptyWrapper>
              )
            ) : (
              <div className="w-full flex flex-wrap gap-[10px]">
                <LoadingSkeleton
                  isClassName={`mb-[30px] xs:w-[calc(50%-7px)] md:w-[calc(50%-10px)] lg:w-[calc(33.33333%-20px)]`}
                  isLoading={statusGetProduct !== THUNK_STATUS.fulfilled}
                  isParagraph={2}
                  isArray={9}
                />
              </div>
            )}
          </div>
          <Pagination
            totalPage={totalPage}
            onChange={onChangePageCurrent}
            pageCurrent={pageCurrent}
          />
        </div>
      </div>
    </main>
  );
};

export default Shop;

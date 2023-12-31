import BreadCrumb from "@/components/BreadCrumb";
import InputRange from "@/components/Input/InputRange";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import {
  MainParamShopProvider,
  useMainParamContext,
} from "@/components/MainParamShopContext";
import NavbarFilter from "@/components/NavbarFilter";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SelectCustom from "@/components/Select/SelectCustom";
import {
  OPTION_LIFE_STYLE,
  OPTION_SEX,
  OPTION_SKIN_TYPE,
  _LIMIT,
} from "@/contants/general";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";
import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Empty, Spin, Tooltip } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";
import useShop from "./useShop";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/reducer/cartReducer";
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
    isFilter,
    onToggleFilter,
    setIsFilter,
    ///
    categories,
    ///
    imageloading,
    onImageLoading,
    ///
    onAddToCart,
    ////
    optionSort,
    onChangeFeaturedTab,
    ////
    onChangePageCurrent,
    pageCurrent,
    ///
    dataShop,
    loadingDataShop,
    queryObject,
    updateQueryString,
    search,
    /////
  } = useShop();
  const dispatch = useDispatch();
  const {
    valueChecked,
    renderChecked,
    onChangeCheckbox,
    onChangeRenderCheckbox,
    setValueChecked,
    setRenderChecked,
    /////
    valueCheckedSex,
    renderCheckedSex,
    setValueCheckedSex,
    setRenderCheckedSex,
    onChangeCheckboxSex,
    onChangeRenderCheckboxSex,
    /////
    valueCheckedLifeStyle,
    renderCheckedLifeStyle,
    setValueCheckedLifeStyle,
    setRenderCheckedLifeStyle,
    onChangeCheckboxLifeStyle,
    onChangeRenderCheckboxLifeStyle,
    ////
    valueCheckedSkinType,
    renderCheckedSkinType,
    setValueCheckedSkinType,
    setRenderCheckedSkinType,
    onChangeCheckboxSkinType,
    onChangeRenderCheckboxSkinType,
  } = useMainParamContext();
  const { width } = useWindowSize();
  const [controlCollapse, setControlCollapse] = useState([]);
  //////
  const inputRangeProps = { updateQueryString, queryObject };

  const itemCategories = [
    {
      key: "1",
      label: (
        <p
          className={`font-ossb text-16px transition-all duration-400 ${
            controlCollapse?.includes("1") ? "text-black" : "text-black-333"
          }`}
        >
          Loại sản phẩm
        </p>
      ),
      children: categories?.map((cate, index) => {
        return (
          <div
            key={cate?._id}
            className={`hover:text-primary cursor-pointer duration-400 transition-all
           flex items-start gap-2 my-[4px] ${
             valueChecked?.includes(cate?._id) ? "font-om text-black" : ""
           } ${loadingDataShop ? "text-[#d9d9d9] cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!loadingDataShop)
                onChangeCheckbox(cate?._id), onChangeRenderCheckbox(cate);
            }}
          >
            <Checkbox
              disabled={loadingDataShop ? true : false}
              checked={
                valueChecked?.length && valueChecked?.includes(cate?._id)
              }
              onChange={() => {
                onChangeCheckbox(cate?._id), onChangeRenderCheckbox(cate);
              }}
            />
            <p className="">
              {cate?.label}{" "}
              {cate?.totalProduct ? `(${cate?.totalProduct})` : `(0)`}
            </p>
          </div>
        );
      }),
    },
    {
      key: "2",
      label: (
        <p
          className={`font-ossb text-16px transition-all duration-400 ${
            controlCollapse?.includes("2") ? "text-black" : "text-black-333"
          }`}
        >
          Giới tính
        </p>
      ),
      children: OPTION_SEX?.map((sex) => {
        return (
          <div
            key={sex?.value}
            className={`hover:text-primary cursor-pointer duration-400 transition-all
           flex items-start gap-2 my-[4px]   ${
             valueCheckedSex?.includes(sex?.value) ? "font-om text-black" : ""
           } ${loadingDataShop ? "text-[#d9d9d9] cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!loadingDataShop)
                onChangeCheckboxSex(sex?.value), onChangeRenderCheckboxSex(sex);
            }}
          >
            <Checkbox
              disabled={loadingDataShop ? true : false}
              checked={
                valueCheckedSex?.length && valueCheckedSex?.includes(sex?.value)
              }
              onChange={() => {
                onChangeCheckboxSex(sex?.value), onChangeRenderCheckboxSex(sex);
              }}
            />
            <p className="">{sex?.label} </p>
          </div>
        );
      }),
    },
    {
      key: "3",
      label: (
        <p
          className={`font-ossb text-16px transition-all duration-400 ${
            controlCollapse?.includes("3") ? "text-black" : "text-black-333"
          }`}
        >
          Sở thích
        </p>
      ),
      children: OPTION_LIFE_STYLE?.map((life) => {
        return (
          <div
            key={life?.value}
            className={`hover:text-primary cursor-pointer duration-400 transition-all
           flex items-start gap-2 my-[4px]   ${
             valueCheckedLifeStyle?.includes(life?.value)
               ? "font-om text-black"
               : ""
           } ${loadingDataShop ? "text-[#d9d9d9] cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!loadingDataShop)
                onChangeCheckboxLifeStyle(life?.value),
                  onChangeRenderCheckboxLifeStyle(life);
            }}
          >
            <Checkbox
              disabled={loadingDataShop ? true : false}
              checked={
                valueCheckedLifeStyle?.length &&
                valueCheckedLifeStyle?.includes(life?.value)
              }
              onChange={() => {
                onChangeCheckboxLifeStyle(life?.value),
                  onChangeRenderCheckboxLifeStyle(life);
              }}
            />
            <p className="">{life?.label} </p>
          </div>
        );
      }),
    },
    {
      key: "4",
      label: (
        <p
          className={`font-ossb text-16px transition-all duration-400 ${
            controlCollapse?.includes("4") ? "text-black" : "text-black-333"
          }`}
        >
          Loại da
        </p>
      ),
      children: OPTION_SKIN_TYPE?.map((skin) => {
        return (
          <div
            key={skin?.value}
            className={`hover:text-primary cursor-pointer duration-400 transition-all
           flex items-start gap-2 my-[4px]   ${
             valueCheckedSkinType?.includes(skin?.value)
               ? "font-om text-black"
               : ""
           } ${loadingDataShop ? "text-[#d9d9d9] cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!loadingDataShop)
                onChangeCheckboxSkinType(skin?.value),
                  onChangeRenderCheckboxSkinType(skin);
            }}
          >
            <Checkbox
              disabled={loadingDataShop ? true : false}
              checked={
                valueCheckedSkinType?.length &&
                valueCheckedSkinType?.includes(skin?.value)
              }
              onChange={() => {
                onChangeCheckboxSkinType(skin?.value),
                  onChangeRenderCheckboxSkinType(skin);
              }}
            />
            <p className="">{skin?.label} </p>
          </div>
        );
      }),
    },
    {
      key: "5",
      label: (
        <p
          className={`font-ossb text-16px transition-all duration-400 ${
            controlCollapse?.includes("5") ? "text-black" : "text-black-333"
          }`}
        >
          Giá sản phẩm
        </p>
      ),
      children: <InputRange {...inputRangeProps} />,
    },
  ];
  const onChangeCollapse = (key) => {
    setControlCollapse(key);
  };
  const filterMobileProps = {
    isFilter,
    onToggleFilter,
    categories,
    setIsFilter,
    itemCategories,
    onChangeCollapse,
  };
  return (
    <MainParamShopProvider>
      {width < 1280 && (
        <div
          className="fixed z-[10] left-[5%] bottom-[20px] 
            p-[7px] md:p-[13px] flex items-center  gap-2  bg-black-333 rounded-[50%]"
          onClick={onToggleFilter}
        >
          <svg
            className="rotate-[90deg] w-[20px] h-[20px] fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M17 8c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-10 6c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm10-8c.343 0 .677.035 1 .101v-2.101c0-.552-.447-1-1-1s-1 .448-1 1v2.101c.323-.066.657-.101 1-.101zm-10 6c.343 0 .677.035 1 .101v-8.101c0-.552-.447-1-1-1s-1 .448-1 1v8.101c.323-.066.657-.101 1-.101zm10 4c-.343 0-.677-.035-1-.101v8.101c0 .552.447 1 1 1s1-.448 1-1v-8.101c-.323.066-.657.101-1 .101zm-10 6c-.343 0-.677-.035-1-.101v2.101c0 .552.447 1 1 1s1-.448 1-1v-2.101c-.323.066-.657.101-1 .101z" />
          </svg>
        </div>
      )}
      <main className="main-wrapper ">
        <div className="container ">
          <div className="xs:mt-[30px] lg:mt-[40px] md:h-[350px] xs:h-[250px]">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/assets/img/shop-banner.jpg"
              alt=""
            />
          </div>
        </div>
        <BreadCrumb>
          <BreadCrumb.Item link={`${PATHS.HOME}`}>Trang chủ</BreadCrumb.Item>
          <BreadCrumb.Item isActive>Sản phẩm</BreadCrumb.Item>
        </BreadCrumb>
        <div className="container ">
          <div className="flex lg:flex-row xs:flex-col gap-[30px]">
            <aside className="sidebar-shop xs:w-full xl:max-w-[265px]  xl:w-1/4 xl:block xs:hidden">
              <div className="">
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
              </div>
            </aside>
            <div className="w-full min-h-[800px]">
              <div
                className="flex items-center  justify-between
                gap-y-[12px] xs:pb-[16px] md:pb-[24px] mb-[24px] border-b 
              border-solid border-[#e5e5e5]"
              >
                {width < 1280 ? (
                  !loadingDataShop ? (
                    <h3 className="min-h-full  min-w-fit text-md font-ossb">
                      {dataShop?.data?.total} Kết quả
                    </h3>
                  ) : (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            minWidth: 50,
                            color: "#555",
                            fontSize: 24,
                          }}
                          spin
                        />
                      }
                      size="default"
                    />
                  )
                ) : (
                  ""
                )}
                {width >= 1280 && (
                  <div className="flex items-center justify-start gap-3 flex-wrap">
                    {!loadingDataShop ? (
                      <h3 className="min-h-full  min-w-fit text-md font-ossb">
                        {dataShop?.data?.total} Kết quả
                      </h3>
                    ) : (
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              minWidth: 50,
                              color: "#555",
                              fontSize: 24,
                            }}
                            spin
                          />
                        }
                        size="default"
                      />
                    )}
                    {renderChecked?.length ? (
                      <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                        {renderChecked?.map((category, index) => {
                          return (
                            <Tooltip
                              key={`${category?._id}${index}`}
                              placement={`top`}
                              color="#999"
                              title={`Bỏ filter ${category?.label}`}
                            >
                              <li
                                className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                                onClick={() => {
                                  onChangeCheckbox(category?._id);
                                  onChangeRenderCheckbox(category);
                                }}
                              >
                                <div>{category?.label} &#10006;</div>
                              </li>
                            </Tooltip>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                    {renderCheckedSex?.length ? (
                      <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                        {renderCheckedSex?.map((sex, index) => {
                          return (
                            <Tooltip
                              key={`${sex?.value}${index}`}
                              placement={`top`}
                              color="#999"
                              title={`Bỏ filter ${sex?.label}`}
                            >
                              <li
                                className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                                onClick={() => {
                                  onChangeCheckboxSex(sex?.value);
                                  onChangeRenderCheckboxSex(sex);
                                }}
                              >
                                <div>{sex?.label} &#10006;</div>
                              </li>
                            </Tooltip>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                    {renderCheckedSkinType?.length ? (
                      <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                        {renderCheckedSkinType?.map((skin, index) => {
                          return (
                            <Tooltip
                              key={`${skin?.value}${index}`}
                              placement={`top`}
                              color="#999"
                              title={`Bỏ filter ${skin?.label}`}
                            >
                              <li
                                className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                                onClick={() => {
                                  onChangeCheckboxSkinType(skin?.value);
                                  onChangeRenderCheckboxSkinType(skin);
                                }}
                              >
                                <div>{skin?.label} &#10006;</div>
                              </li>
                            </Tooltip>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                    {renderCheckedLifeStyle?.length ? (
                      <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                        {renderCheckedLifeStyle?.map((lifeStyle, index) => {
                          return (
                            <Tooltip
                              key={`${lifeStyle?.value}${index}`}
                              placement={`top`}
                              color="#999"
                              title={`Bỏ filter ${lifeStyle?.label}`}
                            >
                              <li
                                className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                                onClick={() => {
                                  onChangeCheckboxLifeStyle(lifeStyle?.value);
                                  onChangeRenderCheckboxLifeStyle(lifeStyle);
                                }}
                              >
                                <div>{lifeStyle?.label} &#10006;</div>
                              </li>
                            </Tooltip>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                    {valueChecked?.length +
                      valueCheckedSex?.length +
                      valueCheckedSkinType?.length +
                      valueCheckedLifeStyle?.length >
                    1 ? (
                      <Tooltip
                        key={`delete-all`}
                        placement={`top`}
                        color="#999"
                        title={`Bỏ tất cả filter`}
                      >
                        <a
                          className="cursor-pointer font-om text-red-700 text-sm 
                                rounded-md border border-red-700 border-solid p-[4px]"
                          onClick={() => {
                            setValueChecked([]),
                              setRenderChecked([]),
                              setValueCheckedSex([]),
                              setRenderCheckedSex([]),
                              setValueCheckedLifeStyle([]),
                              setRenderCheckedLifeStyle([]);
                            setValueCheckedSkinType([]),
                              setRenderCheckedSkinType([]);
                            dispatch(cartActions.setMinPrice(0));
                            dispatch(cartActions.setMaxPrice(60000));
                            updateQueryString({
                              page: 0,
                              limit: _LIMIT,
                            });
                          }}
                        >
                          <div>Xóa tất cả &#10006;</div>
                        </a>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                <SelectCustom
                  defaultTitle={optionSort?.[0]?.lael}
                  onChangeSort={onChangeFeaturedTab}
                  data={optionSort}
                />
              </div>
              <div
                className={`flex items-center flex-wrap xs:gap-y-[20px] gap-[10px]  mb-[30px] `}
              >
                {!loadingDataShop ? (
                  dataShop?.data?.data?.length ? (
                    dataShop?.data?.data?.map((item) => {
                      return (
                        <ProductCard
                          onLoadingImage={onImageLoading}
                          imageloading={imageloading}
                          key={`${item?._id}`}
                          className={`lg:w-[calc(25%-10px)] xs:w-[calc(50%-10px)] md:w-[calc(33.333333%-10px)]`}
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
                      isClassName={`mb-[30px] lg:w-[calc(25%-10px)] xs:w-[calc(50%-10px)] md:w-[calc(33.333333%-10px)]`}
                      isLoading={loadingDataShop}
                      isParagraph={2}
                      isArray={12}
                    />
                  </div>
                )}
              </div>
              <Pagination
                limit={_LIMIT}
                total={dataShop?.data?.total}
                onChange={onChangePageCurrent}
                pageCurrent={pageCurrent}
              />
            </div>
          </div>
        </div>
      </main>
      <NavbarFilter {...filterMobileProps}>
        {width < 1280 && (
          <div className="flex w-full p-[20px_20px_0_20px]  gap-4 flex-wrap">
            <ul className=" flex w-full items-center  gap-2 flex-wrap">
              {renderChecked?.length ? (
                <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                  {renderChecked?.map((category, index) => {
                    return (
                      <Tooltip
                        key={`${category?._id}${index}`}
                        placement={`top`}
                        color="#999"
                        title={`Bỏ filter ${category?.label}`}
                      >
                        <li
                          className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                          onClick={() => {
                            onChangeCheckbox(category?._id);
                            onChangeRenderCheckbox(category);
                          }}
                        >
                          <div>{category?.label} &#10006;</div>
                        </li>
                      </Tooltip>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
              {renderCheckedSex?.length ? (
                <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                  {renderCheckedSex?.map((sex, index) => {
                    return (
                      <Tooltip
                        key={`${sex?.value}${index}`}
                        placement={`top`}
                        color="#999"
                        title={`Bỏ filter ${sex?.label}`}
                      >
                        <li
                          className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                          onClick={() => {
                            onChangeCheckboxSex(sex?.value);
                            onChangeRenderCheckboxSex(sex);
                          }}
                        >
                          <div>{sex?.label} &#10006;</div>
                        </li>
                      </Tooltip>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
              {renderCheckedSkinType?.length ? (
                <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                  {renderCheckedSkinType?.map((skin, index) => {
                    return (
                      <Tooltip
                        key={`${skin?.value}${index}`}
                        placement={`top`}
                        color="#999"
                        title={`Bỏ filter ${skin?.label}`}
                      >
                        <li
                          className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                          onClick={() => {
                            onChangeCheckboxSkinType(skin?.value);
                            onChangeRenderCheckboxSkinType(skin);
                          }}
                        >
                          <div>{skin?.label} &#10006;</div>
                        </li>
                      </Tooltip>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
              {renderCheckedLifeStyle?.length ? (
                <ul className=" flex items-center justify-start gap-x-3 gap-y-2 flex-wrap">
                  {renderCheckedLifeStyle?.map((lifeStyle, index) => {
                    return (
                      <Tooltip
                        key={`${lifeStyle?.value}${index}`}
                        placement={`top`}
                        color="#999"
                        title={`Bỏ filter ${lifeStyle?.label}`}
                      >
                        <li
                          className="cursor-pointer font-om text-black-333 text-sm 
                                 rounded-md border border-black-333 border-solid p-[4px]"
                          onClick={() => {
                            onChangeCheckboxLifeStyle(lifeStyle?.value);
                            onChangeRenderCheckboxLifeStyle(lifeStyle);
                          }}
                        >
                          <div>{lifeStyle?.label} &#10006;</div>
                        </li>
                      </Tooltip>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
              {valueChecked?.length +
                valueCheckedSex?.length +
                valueCheckedSkinType?.length +
                valueCheckedLifeStyle?.length >
              1 ? (
                <Tooltip
                  key={`delete-all`}
                  placement={`top`}
                  color="#999"
                  title={`Bỏ tất cả filter`}
                >
                  <a
                    className="cursor-pointer font-om text-red-700 text-sm 
                                rounded-md border border-red-700 border-solid p-[4px]"
                    onClick={() => {
                      setValueChecked([]), setRenderChecked([]);
                      setValueCheckedSex([]),
                        setRenderCheckedSex([]),
                        setValueCheckedLifeStyle([]),
                        setRenderCheckedLifeStyle([]);
                      setValueCheckedSkinType([]), setRenderCheckedSkinType([]);
                      dispatch(cartActions.setMinPrice(0));
                      dispatch(cartActions.setMaxPrice(60000));
                      updateQueryString({
                        page: 0,
                        limit: _LIMIT,
                      });
                    }}
                  >
                    <div>Xóa tất cả &#10006;</div>
                  </a>
                </Tooltip>
              ) : (
                ""
              )}
            </ul>
          </div>
        )}
      </NavbarFilter>
    </MainParamShopProvider>
  );
};

export default Shop;

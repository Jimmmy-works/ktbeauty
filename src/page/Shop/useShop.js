import { useMainContext } from "@/components/MainContext";
import { CATEGORIES_OPTIONS, OPTION_SORT } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartActions, createCart } from "@/store/reducer/cartReducer";
import {
  getProductDetail,
  productActions,
} from "@/store/reducer/productReducer";
import compareTime from "@/utils/compareTime";
import { localeVN } from "@/utils/timeVN";
import { message } from "antd";
import { limit } from "firebase/firestore";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
const useShop = () => {
  const { isFilter, onToggleFilter, setIsFilter } = useMainContext();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const [imageloading, setImageLoading] = useState(true);
  const onImageLoading = () => {
    setImageLoading(false);
  };
  /// redux
  const dispatch = useDispatch();
  const {
    products,
    productDetail,
    categories,
    statusGetProductDetail,
    statusGetProduct,
    productFilter,
    productFilterAll,
  } = useSelector((state) => state.product);
  const { updateStatusCreateCart, cartInfo, minPrice, maxPrice } = useSelector(
    (state) => state.cart
  );
  /// useParams
  const { slug } = useParams();
  /// handle Update Query String
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
      limit: 9,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  /// category
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.ALL);
  /// filter
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(products);
  const [optionSortSelected, setOptionSortSelected] = useState(
    OPTION_SORT.POPULAR
  );
  const onChangeFeaturedTab = (name) => {
    setOptionSortSelected(name);
  };
  const customCategories = categories
    .filter((cate) => {
      return cate?.name !== "all";
    })
    .map((cate) => {
      let value = cate?.name;
      return value;
    });
  const newMin = minPrice * 1000;
  const newMax = maxPrice * 1000;
  const onFilterButtonClick = (selectedCategory) => {
    if (selectedFilters?.includes(selectedCategory)) {
      let filterCate = selectedFilters?.filter((el) => {
        return el !== selectedCategory;
      });
      setSelectedFilters(filterCate);
      console.log("filterCate", filterCate);
      updateQueryString({ categories: filterCate?.toString() });
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
      console.log("[...selectedFilters, selectedCategory]", [
        ...selectedFilters,
        selectedCategory,
      ]);
      updateQueryString({
        categories: [...selectedFilters, selectedCategory]?.toString(),
      });
    }
  };
  const onFilterItems = () => {
    let finalItems = [];
    if (selectedFilters?.length > 0) {
      let items = selectedFilters?.map((selectedCategory) => {
        let _temp = products?.filter(
          (item) => item?.category_id?.name === selectedCategory
        );
        return _temp;
      });
      finalItems = items?.flat()?.filter((item) => {
        const afterDiscount =
          item?.price - (item?.discount ? item?.discount : 0);

        if (afterDiscount >= newMin && afterDiscount <= newMax) {
          return item;
        }
      });
      if (optionSortSelected === OPTION_SORT.OLD) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return new Date(a?.createdAt) - new Date(b?.createdAt);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.NEWEST) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return new Date(b?.createdAt) - new Date(a?.createdAt);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.LOWER_PRICE) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return a?.price - a?.discount - (b?.price - b?.discount);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.HIGH_PRICE) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return b?.price - b?.discount - (a?.price - a?.discount);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.POPULAR) {
        finalItems = [...finalItems];
      }

      setFilteredItems(finalItems);
      return finalItems;
    } else {
      finalItems = products?.filter((item) => {
        const afterDiscount =
          item?.price - (item?.discount ? item?.discount : 0);
        if (afterDiscount >= newMin && afterDiscount <= newMax) {
          return item;
        }
      });
      if (optionSortSelected === OPTION_SORT.OLD) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return new Date(a?.createdAt) - new Date(b?.createdAt);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.NEWEST) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return new Date(b?.createdAt) - new Date(a?.createdAt);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.LOWER_PRICE) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return a?.price - a?.discount - (b?.price - b?.discount);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.HIGH_PRICE) {
        finalItems = [...finalItems]
          ?.sort((a, b) => {
            return b?.price - b?.discount - (a?.price - a?.discount);
          })
          ?.map((item) => item);
      }
      if (optionSortSelected === OPTION_SORT.POPULAR) {
        finalItems = [...finalItems];
      }
      setFilteredItems(finalItems);
      return finalItems;
    }
  };
  ////// Sort
  const optionSort = [
    { value: 1, name: "popular", label: "Sort By Popularity" },
    { value: 2, name: "old", label: "Sort By Old" },
    { value: 3, name: "newest", label: "Sort By Newest" },
    { value: 4, name: "high-price", label: "Sort By High Price" },
    { value: 5, name: "lower-price", label: "Sort By Lower Price" },
  ];
  /// Main
  const onAddToCart = async (payload) => {
    try {
      if (payload?._id && updateStatusCreateCart !== THUNK_STATUS.pending) {
        let cartPayload = {};
        const matchIndex = cartInfo?.products?.findIndex(
          (productMatched) => productMatched?.product_id === payload?._id
        );
        let newProductPayload = cartInfo?.products?.map((product) => product);
        if (matchIndex > -1) {
          if (
            newProductPayload[matchIndex]?.quantity >= 20 ||
            payload?.quantity > 20 - newProductPayload[matchIndex]?.quantity
          ) {
            message.error(
              `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
            );
          } else {
            newProductPayload[matchIndex] = {
              ...newProductPayload[matchIndex],
              quantity:
                newProductPayload[matchIndex]?.quantity +
                (payload?.quantity ? payload?.quantity : 1),
            };
            message.success(
              `+${payload?.quantity ? payload?.quantity : 1} ${
                newProductPayload[matchIndex]?.name
              }`
            );
          }
        } else {
          if (payload?.quantity < 20) {
            newProductPayload.push({
              ...payload,
              quantity: payload?.quantity,
              product_id: payload?._id,
            });
          } else if (!payload?.quantity) {
            newProductPayload.push({
              ...payload,
              quantity: 1,
              product_id: payload?._id,
            });
          } else {
            message.error(
              `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
            );
          }
        }
        cartPayload = {
          ...cartInfo,
          products: newProductPayload,
        };
        dispatch(cartActions.setCartInfo(cartPayload));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    onFilterItems();
  }, [selectedFilters, products, newMax, newMin, optionSortSelected]);

  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
  useEffect(() => {
    if (slug) {
      dispatch(getProductDetail(slug));
    }
  }, [slug]);

  return {
    // min,
    // max,
    // onChangeMax,
    // onChangeMin,
    isFilter,
    onToggleFilter,
    setIsFilter,
    categories,
    products,
    productDetail,
    statusGetProductDetail,
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
    selectedFilters,
    setFilteredItems,

    onFilterItems,
    productFilter,
    productFilterAll,

    optionSort,
    onChangeFeaturedTab,
  };
};

export default useShop;

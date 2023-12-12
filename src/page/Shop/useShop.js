import { useMainContext } from "@/components/MainContext";
import { CATEGORIES_OPTIONS, OPTION_SORT } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import useQuery from "@/hooks/useQuery";
import productService from "@/service/productService";
import { cartActions } from "@/store/reducer/cartReducer";
import { getProductSelected } from "@/store/reducer/productReducer";
import { message } from "antd";
import queryString from "query-string";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
const useShop = () => {
  const {
    isFilter,
    onToggleFilter,
    setIsFilter,
    categoryGlobalTab,
    onChangeCategoryGlobal,
  } = useMainContext();
  const _limit = 9;
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
    statusGetProducts,
    productFilter,
    productFilterAll,
    totalProducts,
    totalPage,
    productSearch,
  } = useSelector((state) => state.product);
  const { updateStatusCreateCart, cartInfo, minPrice, maxPrice } = useSelector(
    (state) => state.cart
  );
  /// useParams
  const { search, pathname } = useLocation();
  const queryObject = queryString.parse(search);
  const { slug: slugParams } = useParams();
  /// handle Update Query String
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  /// category
  const customCategories = categories?.map((cate) => {
    let value = { _id: cate?._id, name: cate?.name };
    return value;
  });
  const findCategoryAll = categories?.find((cate) => {
    return cate?.name === "all";
  });
  /// filter
  const defaultFilters = useMemo(() => {
    let querryParse = queryString.parse(search);
    return querryParse;
  }, [search]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(products);
  const [optionSortSelected, setOptionSortSelected] = useState(
    OPTION_SORT.NEWEST
  );
  console.log("selectedFilters", selectedFilters);
  ////// Sort
  const optionSort = [
    // { value: 1, name: "all", label: "Sort By Popularity" },
    { value: 1, name: "newest", label: "Sort By Newest" },
    { value: 2, name: "old", label: "Sort By Old" },
    { value: 3, name: "high", label: "Sort By High Price" },
    { value: 4, name: "lower", label: "Sort By Lower Price" },
  ];

  const [pageCurrent, setPageCurrent] = useState(1);
  const onChangeFeaturedTab = (name) => {
    setOptionSortSelected(name);
    if (name)
      updateQueryString({
        ...queryObject,
        sort: name,
        priceStart: newMin,
        priceEnd: newMax,
      });
  };
  const newMin = minPrice * 1000;
  const newMax = maxPrice * 1000;
  const onChangePageCurrent = (pageNumb) => {
    setPageCurrent(pageNumb);
    if (pageNumb)
      updateQueryString({
        ...queryObject,
        page: pageNumb - 1,
      });
  };
  const onFilterButtonClick = (selectedCategory) => {
    if (selectedCategory === findCategoryAll?._id) {
      setSelectedFilters([findCategoryAll?._id]);
      updateQueryString({
        ...queryObject,
        page: 0,
        limit: _limit,
        categories: [findCategoryAll?._id]?.toString(),
      });
    } else {
      if (selectedFilters?.includes(selectedCategory)) {
        if (selectedFilters?.length <= 1) {
          setSelectedFilters([findCategoryAll?._id]);
          updateQueryString({
            ...queryObject,
            page: 0,
            limit: _limit,
            categories: [findCategoryAll?._id]?.toString(),
          });
        } else {
          let filterCate = selectedFilters?.filter((el) => {
            return el !== selectedCategory;
          });
          setSelectedFilters(filterCate);
          updateQueryString({
            ...queryObject,
            page: 0,
            limit: _limit,
            categories: filterCate?.toString(),
          });
        }
      } else {
        if (
          selectedFilters?.includes(findCategoryAll?._id) &&
          selectedFilters?.length > 2
        ) {
          setSelectedFilters([findCategoryAll?._id]);
          updateQueryString({
            ...queryObject,
            page: 0,
            limit: _limit,
            categories: [findCategoryAll?._id]?.toString(),
          });
        } else {
          let filterCate = selectedFilters?.filter((el) => {
            return el !== findCategoryAll?._id;
          });
          setSelectedFilters([...filterCate, selectedCategory]);
          updateQueryString({
            ...queryObject,
            page: 0,
            limit: _limit,
            categories: [...filterCate, selectedCategory]?.toString(),
          });
        }
      }
    }
  };
  // const customCategories = categories
  //   .filter((cate) => {
  //     return cate?.name !== "all";
  //   })
  //   .map((cate) => {
  //     let value = cate?.name;
  //     return value;
  //   });
  // const onFilterButtonClick = (selectedCategory) => {
  //   if (selectedFilters?.includes(selectedCategory)) {
  //     let filterCate = selectedFilters?.filter((el) => {
  //       return el !== selectedCategory;
  //     });
  //     setSelectedFilters(filterCate);
  //     updateQueryString({ categories: filterCate?.toString() });
  //   } else {
  //     setSelectedFilters([...selectedFilters, selectedCategory]);
  //     updateQueryString({
  //       categories: [...selectedFilters, selectedCategory]?.toString(),
  //     });
  //   }
  // };
  // const onFilterItems = () => {
  //   let finalItems = [];
  //   if (selectedFilters?.length > 0) {
  //     let items = selectedFilters?.map((selectedCategory) => {
  //       let _temp = products?.filter(
  //         (item) => item?.category_id?.name === selectedCategory
  //       );
  //       return _temp;
  //     });
  //     finalItems = items?.flat()?.filter((item) => {
  //       const afterDiscount =
  //         item?.price - (item?.discount ? item?.discount : 0);

  //       if (afterDiscount >= newMin && afterDiscount <= newMax) {
  //         return item;
  //       }
  //     });
  //     if (optionSortSelected === OPTION_SORT.OLD) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return new Date(a?.createdAt) - new Date(b?.createdAt);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.NEWEST) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return new Date(b?.createdAt) - new Date(a?.createdAt);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.LOWER_PRICE) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return a?.price - a?.discount - (b?.price - b?.discount);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.HIGH_PRICE) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return b?.price - b?.discount - (a?.price - a?.discount);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.POPULAR) {
  //       finalItems = [...finalItems];
  //     }

  //     setFilteredItems(finalItems);
  //     return finalItems;
  //   } else {
  //     finalItems = products?.filter((item) => {
  //       const afterDiscount =
  //         item?.price - (item?.discount ? item?.discount : 0);
  //       if (afterDiscount >= newMin && afterDiscount <= newMax) {
  //         return item;
  //       }
  //     });
  //     if (optionSortSelected === OPTION_SORT.OLD) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return new Date(a?.createdAt) - new Date(b?.createdAt);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.NEWEST) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return new Date(b?.createdAt) - new Date(a?.createdAt);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.LOWER_PRICE) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return a?.price - a?.discount - (b?.price - b?.discount);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.HIGH_PRICE) {
  //       finalItems = [...finalItems]
  //         ?.sort((a, b) => {
  //           return b?.price - b?.discount - (a?.price - a?.discount);
  //         })
  //         ?.map((item) => item);
  //     }
  //     if (optionSortSelected === OPTION_SORT.POPULAR) {
  //       finalItems = [...finalItems];
  //     }
  //     setFilteredItems(finalItems);
  //     return finalItems;
  //   }
  // };

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
  const {
    data: dataShop,
    loading: loadingDataShop,
    refetch: refetchDataShop,
  } = useQuery(
    (query) => {
      if (search) {
        return productService.getProductSelected(
          query ||
            `?${queryString.stringify({
              ...queryObject,
              page: pageCurrent - 1 || 0,
              limit: _limit || 9,
              sort: optionSortSelected || "newest",
              categories:
                selectedFilters?.toString() ||
                defaultFilters?.categories ||
                findCategoryAll?._id,
              priceStart: newMin,
              priceEnd: newMax,
            })}`
        );
      }
    },
    [search]
  );

  return {
    isFilter,
    onToggleFilter,
    setIsFilter,
    categories,
    products,
    productDetail,
    statusGetProductDetail,
    statusGetProducts,
    imageloading,
    onImageLoading,
    onAddToCart,
    /// category
    onChangeCategoryGlobal,
    categoryGlobalTab,
    customCategories,
    onFilterButtonClick,
    selectedFilters,
    filteredItems,
    setSelectedFilters,
    selectedFilters,
    setFilteredItems,
    totalProducts,
    totalPage,
    ////
    productFilter,
    productFilterAll,
    findCategoryAll,
    /////
    optionSort,
    onChangeFeaturedTab,
    ////
    slugParams,
    onChangePageCurrent,
    pageCurrent,
    dataShop,
    loadingDataShop,
    productSearch,
    updateQueryString,
    queryObject,
    search,
  };
};

export default useShop;

import { useMainContext } from "@/components/MainContext";
import { OPTION_SORT } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import useQuery from "@/hooks/useQuery";
import productService from "@/service/productService";
import { cartActions } from "@/store/reducer/cartReducer";
import { message } from "antd";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
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
    let value = { _id: cate?._id, name: cate?.name, label: cate?.label };
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
  const [valueChecked, setValueChecked] = useState([]);
  const [renderChecked, setRenderChecked] = useState([]);
  const [optionSortSelected, setOptionSortSelected] = useState(
    OPTION_SORT.NEWEST
  );
  ////// Sort
  const optionSort = [
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

  const onChangeCheckbox = (id) => {
    if (valueChecked?.includes(id)) {
      let filterCate = valueChecked?.filter((cate) => {
        return cate !== id;
      });
      setValueChecked(filterCate);
    } else {
      let filterCate = valueChecked?.filter((cate) => {
        return cate !== id;
      });
      setValueChecked([...filterCate, id]);
    }
  };
  const onChangeRenderCheckbox = (selected) => {
    if (valueChecked?.includes(selected?._id)) {
      let filterRenderCate = renderChecked?.filter((cate) => {
        return cate?._id !== selected?._id;
      });
      setRenderChecked(filterRenderCate);
    } else {
      let filterRenderCate = renderChecked?.filter((cate) => {
        return cate?._id !== selected?._id;
      });
      setRenderChecked([...filterRenderCate, selected]);
    }
  };
  /// Main
  const onAddToCart = async (payload) => {
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    try {
      if (_token) {
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
              if (
                newProductPayload[matchIndex]?.quantity +
                  (payload?.quantity ? payload?.quantity : 1) >=
                newProductPayload[matchIndex]?.countInStock
              ) {
                message.error(
                  `Sản phẩm ${payload?.name}, chỉ còn ${payload?.countInStock}`
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
            }
          } else {
            if (payload.quantity > payload?.countInStock) {
              message.error(
                `Sản phẩm ${payload?.name}, chỉ còn ${payload?.countInStock}`
              );
            } else {
              if (payload?.quantity <= 20) {
                newProductPayload.push({
                  ...payload,
                  quantity:
                    payload?.quantity >= payload?.countInStock
                      ? payload?.countInStock
                      : payload.quantity,
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
          }
          cartPayload = {
            ...cartInfo,
            products: newProductPayload,
          };
          dispatch(cartActions.setCartInfo(cartPayload));
        }
      } else {
        message.error(`Xin vui lòng đăng nhập để thêm sản phẩm`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const {
    data: dataShop,
    loading: loadingDataShop,
    refetch: refetchDataShop,
  } = useQuery((query) => {
    if (search) {
      return productService.getProductSelected(search);
    }
  });
  useEffect(() => {
    updateQueryString({
      ...queryObject,
      page: pageCurrent - 1 || 0,
      limit: 12,
      sort: optionSortSelected || "newest",
      categories: valueChecked?.toString() || findCategoryAll?._id,
      priceStart: newMin,
      priceEnd: newMax,
    });
    if (search) {
      refetchDataShop();
    }
  }, [valueChecked, newMin, newMax, optionSortSelected]);
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
    ////
    valueChecked,
    renderChecked,
    onChangeCheckbox,
    onChangeRenderCheckbox,
  };
};

export default useShop;

import { useMainContext } from "@/components/MainContext";
import { CATEGORIES_OPTIONS } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartActions, createCart } from "@/store/reducer/cartReducer";
import {
  getProductDetail,
  productActions,
} from "@/store/reducer/productReducer";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const useShop = () => {
  const { isFilter, onToggleFilter, setIsFilter } = useMainContext();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const [imageloading, setImageLoading] = useState(true);
  const onImageLoading = () => {
    setImageLoading(false);
  };
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
  const { profile } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.ALL);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(products);
  const customCategories = ["face", "body", "supplement", "other"];
  const newMin = minPrice * 1000;
  const newMax = maxPrice * 1000;
  const onFilterButtonClick = (selectedCategory) => {
    if (selectedFilters?.includes(selectedCategory)) {
      let filterCate = selectedFilters?.filter((el) => {
        return el !== selectedCategory;
      });
      setSelectedFilters(filterCate);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
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

      setFilteredItems(finalItems);
      return finalItems;
    }
  };

  useEffect(() => {
    onFilterItems();
  }, [selectedFilters, products, newMax, newMin]);

  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
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
  // const onAddToCart = async (payload) => {
  //   try {
  //     if (payload?._id && updateStatusCreateCart !== THUNK_STATUS.pending) {
  //       let cartPayload = {};
  //       const matchIndex = cartInfo?.products?.findIndex(
  //         (productMatched) => productMatched?.product_id === payload?._id
  //       );
  //       let newProductPayload = cartInfo?.products?.map((product) => product);
  //       if (cartInfo?._id) {
  //         if (matchIndex > -1) {
  //           if (newProductPayload[matchIndex]?.quantity >= 20) {
  //             message.error(
  //               `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
  //             );
  //           } else {
  //             newProductPayload[matchIndex] = {
  //               ...newProductPayload[matchIndex],
  //               quantity:
  //                 newProductPayload[matchIndex]?.quantity +
  //                 (payload?.quantity ? payload?.quantity : 1),
  //             };
  //             message.success(
  //               `${payload?.quantity ? payload?.quantity : 1} ${
  //                 newProductPayload[matchIndex]?.name
  //               }`
  //             );
  //           }
  //         } else {
  //           newProductPayload.push({
  //             ...payload,
  //             quantity: 1,
  //             product_id: payload?._id,
  //           });
  //         }
  //         cartPayload = {
  //           ...cartInfo,
  //           products: newProductPayload,
  //         };
  //       } else {
  //         if (matchIndex > -1) {
  //           if (newProductPayload[matchIndex]?.quantity >= 20) {
  //             message.error(
  //               `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
  //             );
  //           } else {
  //             newProductPayload[matchIndex] = {
  //               ...newProductPayload[matchIndex],
  //               quantity:
  //                 newProductPayload[matchIndex]?.quantity +
  //                 (payload?.quantity ? payload?.quantity : 1),
  //             };
  //             message.success(
  //               `${payload?.quantity ? payload?.quantity : 1} ${
  //                 newProductPayload[matchIndex]?.name
  //               }`
  //             );
  //           }
  //         } else {
  //           newProductPayload.push({
  //             ...payload,
  //             quantity: 1,
  //             product_id: payload?._id,
  //           });
  //         }
  //         cartPayload = {
  //           ...cartInfo,
  //           products: newProductPayload,
  //         };
  //       }
  //       dispatch(cartActions.setCartInfo(cartPayload));
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
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
  };
};

export default useShop;

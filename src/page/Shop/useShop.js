import { useMainContext } from "@/components/MainContext";
import { CATEGORIES_OPTIONS } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartActions, createCart } from "@/store/reducer/cartReducer";
import { getProductDetail } from "@/store/reducer/productReducer";
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
  } = useSelector((state) => state.product);
  const { updateStatusCreateCart, cartInfo } = useSelector(
    (state) => state.cart
  );
  const { profile } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.ALL);

  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };

  const addToCart = async (payload, e) => {
    try {
      const newPayload = {
        user_id: profile?._id,
        email: profile?.email,
        product_id: payload?._id,
        name: payload?.name,
        slug: payload?.slug,
        image: payload?.image,
        countInStock: payload?.countInStock || 0,
        discount: payload?.countInStock || 0,
        price: payload?.price,
        quantity: payload?.quantity || 1,
      };
      if (payload?.quantity > 20) {
        message.error(
          `Sản phẩm không được thêm quá 20! Mua thêm hãy liên hệ shop!`
        );
      } else {
        if (updateStatusCreateCart !== THUNK_STATUS.pending) {
          await dispatch(createCart(newPayload));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
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
    addToCart,
    onChangeCategoryTab,
    categoryTab,
  };
};

export default useShop;

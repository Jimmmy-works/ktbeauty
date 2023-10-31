import { useMainContext } from "@/components/MainContext";
import { getProductDetail } from "@/store/reducer/productReducer";
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
  const { slug } = useParams();
  const dispatch = useDispatch();
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
  };
};

export default useShop;

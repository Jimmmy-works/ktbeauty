import { useMainContext } from "@/components/MainContext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const useShop = () => {
  const { isFilter, onToggleFilter, setIsFilter } = useMainContext();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  const { products, categories } = useSelector((state) => state.product);
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
  };
};

export default useShop;

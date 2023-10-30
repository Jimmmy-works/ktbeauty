import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHome = () => {
  //// redux
  const dispatch = useDispatch();
  const { products, categories, statusGetProduct } = useSelector(
    (state) => state.product
  );
  /// categoryProps
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.FACE);
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.FEATURED);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
  /// ShowcaseProduct
  const showcaseProductProps = {
    onChangeCategoryTab,
    categoryTab,
    categories,
    products,
    statusGetProduct,
  };
  // useEffect(() => {
  //   dispatch(getAllProduct());
  //   dispatch(getAllCategories());
  // }, []);
  const featuredProps = {
    onChangeFeaturedTab,
    featuerdTab,
    products,
    statusGetProduct,
  };
  const categoryProps = { onChangeCategoryTab, categoryTab };
  return { featuredProps, showcaseProductProps };
};

export default useHome;

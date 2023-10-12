import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const useHome = () => {
  /// categoryProps
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.LIPSTICK);
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.FEATURED);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
  const featuredProps = { onChangeFeaturedTab, featuerdTab };
  const categoryProps = { onChangeCategoryTab, categoryTab };
  return { featuredProps, categoryProps };
};

export default useHome;

import {
  CATEGORIES_OPTIONS,
  FEATURED_OPTIONS,
  _LIMIT,
} from "@/contants/general";
import useQuery from "@/hooks/useQuery";
import productService from "@/service/productService";
import queryString from "query-string";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const useHome = () => {
  const [imageloading, setImageLoading] = useState(true);
  const onImageLoading = () => {
    setImageLoading(false);
  };
  ////
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  //// redux
  const { products, categories, statusGetProduct } = useSelector(
    (state) => state.product
  );
  /// categoryProps
  const [categoryTab, setCategoryTab] = useState({});
  const customCategoryTab = useMemo(() => {
    const findCategories = categories?.find((cate) => {
      if (cate?.name === CATEGORIES_OPTIONS.ALL) {
        return cate?._id;
      }
    });
    if (Object.keys(categoryTab).length > 0) {
      return categoryTab;
    } else {
      return findCategories;
    }
  }, [categoryTab, categories]);
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.TOP_SOLD);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
  const { data: dataShowcaseProduct, loading: loadingShowcaseProduct } =
    useQuery(
      (query) => {
        return productService.getProductSelected(
          query ||
            `?${queryString.stringify({
              ...queryObject,
              limit: _LIMIT,
              sort: "newest",
              categories: categoryTab?._id?.toString(),
            })}`
        );
      },
      [categoryTab]
    );
  const { data: dataFeatured, loading: loadingFeatured } = useQuery(() => {
    return productService.getTopRate(
      `?${queryString.stringify({
        limit: _LIMIT,
        type: featuerdTab,
      })}`
    );
  }, [featuerdTab]);
  /// ShowcaseProduct
  const showcaseProductProps = {
    onChangeCategoryTab,
    categoryTab,
    categories,
    products,
    imageloading,
    onImageLoading,
    dataShowcaseProduct,
    loadingShowcaseProduct,
    customCategoryTab,
  };
  const featuredProps = {
    onChangeFeaturedTab,
    featuerdTab,
    products,
    statusGetProduct,
    imageloading,
    onImageLoading,
    dataFeatured,
    loadingFeatured,
  };
  return { featuredProps, showcaseProductProps };
};

export default useHome;

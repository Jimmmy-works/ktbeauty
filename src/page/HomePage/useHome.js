import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import useQuery from "@/hooks/useQuery";
import productService from "@/service/productService";
import { cartActions } from "@/store/reducer/cartReducer";
import { message } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

const useHome = () => {
  const [imageloading, setImageLoading] = useState(true);
  const onImageLoading = () => {
    setImageLoading(false);
  };
  ////
  const { search, pathname } = useLocation();
  const queryObject = queryString.parse(search);
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  //// redux
  const dispatch = useDispatch();
  const { updateStatusCreateCart, cartInfo } = useSelector(
    (state) => state.cart
  );
  const { products, categories, statusGetProduct } = useSelector(
    (state) => state.product
  );
  /// categoryProps
  const [categoryTab, setCategoryTab] = useState({
    name: CATEGORIES_OPTIONS.ALL,
  });
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
    updateQueryString({ limit: 9, categories: tab?._id });
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.FEATURED);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
  const onAddToCart = async (payload) => {
    try {
      if (payload?._id && updateStatusCreateCart !== THUNK_STATUS.pending) {
        let cartPayload = {};
        const matchIndex = cartInfo?.products?.findIndex(
          (productMatched) => productMatched?.product_id === payload?._id
        );
        let newProductPayload = cartInfo?.products?.map((product) => product);
        if (cartInfo?._id) {
          if (matchIndex > -1) {
            if (newProductPayload[matchIndex]?.quantity >= 20) {
              message.error(
                `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
              );
            } else {
              newProductPayload[matchIndex] = {
                ...newProductPayload[matchIndex],
                quantity: newProductPayload[matchIndex]?.quantity + 1,
              };
              message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
            }
          } else {
            newProductPayload.push({
              ...payload,
              quantity: 1,
              product_id: payload?._id,
            });
          }
          cartPayload = {
            ...cartInfo,
            products: newProductPayload,
          };
        } else {
          if (matchIndex > -1) {
            if (newProductPayload[matchIndex]?.quantity >= 20) {
              message.error(
                `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
              );
            } else {
              newProductPayload[matchIndex] = {
                ...newProductPayload[matchIndex],
                quantity: newProductPayload[matchIndex]?.quantity + 1,
              };
              message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
            }
          } else {
            newProductPayload.push({
              ...payload,
              quantity: 1,
              product_id: payload?._id,
            });
          }
          cartPayload = {
            ...cartInfo,
            products: newProductPayload,
          };
        }
        dispatch(cartActions.setCartInfo(cartPayload));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const { data: dataShowcaseProduct, loading: loadingShowcaseProduct } =
    useQuery(
      (query) => {
        if (search) {
          return productService.getProductSelected(
            query ||
              `?${queryString.stringify({
                ...queryObject,
                limit: 9,
                sort: "newest",
                categories: categoryTab?._id?.toString(),
              })}`
          );
        } else {
          return productService.getProductSelected(
            query ||
              `?${queryString.stringify({
                ...queryObject,
                limit: 9,
                sort: "newest",
                categories: categoryTab?._id?.toString(),
              })}`
          );
        }
      },
      [search]
    );

  /// ShowcaseProduct
  const showcaseProductProps = {
    onChangeCategoryTab,
    categoryTab,
    categories,
    products,
    imageloading,
    onImageLoading,
    onAddToCart,
    dataShowcaseProduct,
    loadingShowcaseProduct,
  };
  const featuredProps = {
    onChangeFeaturedTab,
    featuerdTab,
    products,
    statusGetProduct,
    imageloading,
    onImageLoading,
    onAddToCart,
  };
  return { featuredProps, showcaseProductProps };
};

export default useHome;

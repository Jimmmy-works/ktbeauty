import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import useQuery from "@/hooks/useQuery";
import dashboardService from "@/service/dashboardService";
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
  const [categoryTab, setCategoryTab] = useState({});
  console.log("categoryTab", categoryTab);
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
    updateQueryString({ limit: 9, categories: tab?._id });
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.TOP_SOLD);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
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
      } else {
        message.error(`Xin vui lòng đăng nhập để thêm sản phẩm`);
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
        }
      },
      [search]
    );
  const { data: dataFeatured, loading: loadingFeatured } = useQuery(() => {
    return productService.getTopRate(
      `?${queryString.stringify({
        limit: 9,
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
    dataFeatured,
    loadingFeatured,
  };
  return { featuredProps, showcaseProductProps };
};

export default useHome;

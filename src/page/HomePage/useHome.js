import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { createCart, getCart } from "@/store/reducer/cartReducer";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHome = () => {
  const [imageloading, setImageLoading] = useState(true);
  const onImageLoading = () => {
    setImageLoading(false);
  };
  //// redux
  const dispatch = useDispatch();
  const { updateStatusCreateCart } = useSelector((state) => state.cart);
  const { products, categories, statusGetProduct } = useSelector(
    (state) => state.product
  );
  const { profile } = useSelector((state) => state.auth);
  /// categoryProps
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.ALL);
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.FEATURED);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
  const filterProductShowcase = useMemo(() => {
    let newProducts = [];
    switch (categoryTab) {
      case CATEGORIES_OPTIONS.FACE:
        newProducts = products?.filter(
          (product) => product?.category_id?.name === CATEGORIES_OPTIONS.FACE
        );
        break;
      case CATEGORIES_OPTIONS.BODY:
        newProducts = products?.filter(
          (product) => product?.category_id?.name === CATEGORIES_OPTIONS.BODY
        );
        break;
      case CATEGORIES_OPTIONS.OTHER:
        newProducts = products?.filter(
          (product) => product?.category_id?.name === CATEGORIES_OPTIONS.OTHER
        );
        break;
      case CATEGORIES_OPTIONS.SKIN:
        newProducts = products?.filter(
          (product) => product?.category_id?.name === CATEGORIES_OPTIONS.SKIN
        );
        break;
      case CATEGORIES_OPTIONS.SUPPLEMENT:
        newProducts = products?.filter(
          (product) =>
            product?.category_id?.name === CATEGORIES_OPTIONS.SUPPLEMENT
        );
        break;
      case CATEGORIES_OPTIONS.ALL:
        newProducts = products;
        break;

      default:
        return (newProducts = []);
    }

    return newProducts;
  }, [categoryTab, products]);
  /// add to cart
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
        price: payload?.price || 0,
        quantity: 1,
      };
      if (updateStatusCreateCart !== THUNK_STATUS.pending) {
        await dispatch(createCart(newPayload));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  /// ShowcaseProduct
  const showcaseProductProps = {
    onChangeCategoryTab,
    categoryTab,
    categories,
    products,
    statusGetProduct,
    imageloading,
    onImageLoading,
    addToCart,
    filterProductShowcase,
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
    imageloading,
    onImageLoading,
    addToCart,
  };
  const categoryProps = { onChangeCategoryTab, categoryTab };
  return { featuredProps, showcaseProductProps };
};

export default useHome;

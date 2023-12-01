import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartActions } from "@/store/reducer/cartReducer";
import { message } from "antd";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHome = () => {
  const [imageloading, setImageLoading] = useState(true);
  const onImageLoading = () => {
    setImageLoading(false);
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
  /// ShowcaseProduct
  const showcaseProductProps = {
    onChangeCategoryTab,
    categoryTab,
    categories,
    products,
    statusGetProduct,
    imageloading,
    onImageLoading,
    onAddToCart,
    filterProductShowcase,
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

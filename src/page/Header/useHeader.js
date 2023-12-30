import { useMainContext } from "@/components/MainContext";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import productService from "@/service/productService";
import { cartActions, updateCart } from "@/store/reducer/cartReducer";
import { updateWhiteList } from "@/store/reducer/whitelistReducer";
import { removeAccents } from "@/utils/removeAccents";
import useWindowSize from "@/utils/windowResize";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const useHeader = () => {
  const { width } = useWindowSize();
  const { categories } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { isNavbar, onToggleNav, onAuthenModal, onActiveLinkTab, onLogout } =
    useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo, updateStatusUpdateCart } = useSelector(
    (state) => state.cart
  );
  const { whiteListInfo, statusUpdateWhiteList, statusGetWhiteList } =
    useSelector((state) => state.whitelist);
  const [productListSearch, setProductListSearch] = useState([]);
  //// useParams
  const { search, pathname } = useLocation();
  const onSearchProduct = async (productName) => {
    try {
      const dataProduct = await productService.getAllProduct();
      if (dataProduct?.status === 200) {
        const result = dataProduct?.data?.data?.filter((product) => {
          return removeAccents(product?.name ?? "")
            .toLowerCase()
            .includes(removeAccents(productName.toLowerCase()));
        });
        if (productName) {
          setProductListSearch(result);
        } else {
          setProductListSearch([]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  /// quantity
  const onChangeQuantity = async (updateValue, updateIndex) => {
    let cartPayload = {};
    let newProductPayload = cartInfo?.products.map((product) => {
      return product;
    });
    try {
      if (cartInfo?._id && updateStatusUpdateCart !== THUNK_STATUS.pending) {
        newProductPayload[updateIndex] = {
          ...newProductPayload[updateIndex],
          quantity: updateValue,
        };
        cartPayload = {
          ...cartInfo,
          products: newProductPayload,
        };
        dispatch(updateCart(cartPayload));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onDeleteProductInCart = (id) => {
    let cartPayload = {};
    const findItem = cartInfo?.products?.find((item) => item?._id === id);
    const filterItem = cartInfo?.products?.filter(
      (item) => item?._id !== findItem?._id
    );
    cartPayload = {
      ...cartInfo,
      products: filterItem,
    };
    dispatch(updateCart(cartPayload));
  };
  const onDeleteProductInWhiteList = (id) => {
    let whiteListPayload = {};
    const findItem = whiteListInfo?.products?.find((item) => item?._id === id);
    const filterItem = whiteListInfo?.products?.filter(
      (item) => item?._id !== findItem?._id
    );
    whiteListPayload = {
      ...whiteListInfo,
      products: filterItem,
    };
    dispatch(updateWhiteList(whiteListPayload));
  };
  const headerProps = {
    profile,
    isNavbar,
    onToggleNav,
    onAuthenModal,
    onActiveLinkTab,
    onLogout,
    categories,
    cartInfo,
    onDeleteProductInCart,
    onSearchProduct,
    pathname,
    productListSearch,
    width,
    ////
    onChangeQuantity,
    updateStatusUpdateCart,
    ///
    whiteListInfo,
    statusUpdateWhiteList,
    statusGetWhiteList,
    onDeleteProductInWhiteList,
  };
  return { headerProps };
};

export default useHeader;

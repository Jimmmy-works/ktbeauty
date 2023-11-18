import { useMainContext } from "@/components/MainContext";
import { cartActions } from "@/store/reducer/cartReducer";
import { dashboardActions } from "@/store/reducer/dashboardReducer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useHeader = () => {
  const { categories, products } = useSelector((state) => state.product);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isNavbar, onToggleNav, onAuthenModal, onActiveLinkTab, onLogout } =
    useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);
  const [productListSearch, setProductListSearch] = useState([]);
  const onDeleteProductInCart = (id) => {
    const findItem = cartInfo?.products?.find((item) => item?._id === id);
    const filterItem = cartInfo?.products?.filter(
      (item) => item?._id !== findItem?._id
    );
    dispatch(cartActions?.setCartInfo({ ...cartInfo, products: filterItem }));
  };
  const onSearchProduct = (productName) => {
    const result = products?.filter((product) => {
      return product?.name.toLowerCase().includes(productName);
    });
    if (productName) {
      setProductListSearch(result);
    } else {
      setProductListSearch([]);
    }
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
  };
  return { headerProps };
};

export default useHeader;

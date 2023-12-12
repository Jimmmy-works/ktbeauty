import { useMainContext } from "@/components/MainContext";
import { cartActions } from "@/store/reducer/cartReducer";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
const useHeader = () => {
  const _limit = 9;
  const { categories, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { isNavbar, onToggleNav, onAuthenModal, onActiveLinkTab, onLogout } =
    useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo, minPrice, maxPrice } = useSelector((state) => state.cart);
  const [productListSearch, setProductListSearch] = useState([]);
  const [categoryTab, setCategoryTab] = useState();
  //// useParams
  const { search, pathname } = useLocation();
  const queryObject = queryString.parse(search);
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
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
  const onChangeCategory = (tab) => {
    setCategoryTab(tab);
  };
  const newMin = minPrice * 1000;
  const newMax = maxPrice * 1000;
  useEffect(() => {
    updateQueryString({
      ...queryObject,
      limit: _limit,
      page: 0,
      categories: categoryTab,
      priceStart: newMin,
      priceEnd: newMax,
    });
  }, [categoryTab]);
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
    onChangeCategory,
  };
  return { headerProps };
};

export default useHeader;

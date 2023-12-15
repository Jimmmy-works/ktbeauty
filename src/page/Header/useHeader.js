import { useMainContext } from "@/components/MainContext";
import { PATHS } from "@/contants/path";
import productService from "@/service/productService";
import { cartActions } from "@/store/reducer/cartReducer";
import { removeAccents } from "@/utils/removeAccents";
import { limit } from "firebase/firestore";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const onChangeCategory = (tab) => {
    setCategoryTab(tab);
  };
  useEffect(() => {
    updateQueryString({
      ...queryObject,
      limit: _limit,
      page: 0,
      categories: categoryTab,
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
    categoryTab,
  };
  return { headerProps };
};

export default useHeader;

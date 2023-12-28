import { useMainContext } from "@/components/MainContext";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import productService from "@/service/productService";
import { cartActions, updateCart } from "@/store/reducer/cartReducer";
import { removeAccents } from "@/utils/removeAccents";
import useWindowSize from "@/utils/windowResize";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const useHeader = () => {
  const { width } = useWindowSize();
  const { categories, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { isNavbar, onToggleNav, onAuthenModal, onActiveLinkTab, onLogout } =
    useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo, total, subTotal, discountCode, updateStatusUpdateCart } =
    useSelector((state) => state.cart);
  const [productListSearch, setProductListSearch] = useState([]);
  //// useParams
  const { search, pathname } = useLocation();
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
    onChangeQuantity,
    total,
    subTotal,
    discountCode,
    updateStatusUpdateCart,
  };
  return { headerProps };
};

export default useHeader;

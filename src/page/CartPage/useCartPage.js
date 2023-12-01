import { cartActions } from "@/store/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";

const useCartPage = () => {
  const dispatch = useDispatch();
  const { cartInfo, total, subTotal } = useSelector((state) => state.cart);
  const onChangeQuantity = async (updateValue, updateIndex) => {
    try {
      const map = cartInfo?.products?.find((_, index) => {
        return index === updateIndex;
      });
      let customItem = {
        id: map?._id,
        updateQuantity: updateValue,
      };
      await dispatch(cartActions.addToCart(customItem));
    } catch (error) {
      console.log("error", error);
    }
  };
  const onDeleteProductInCart = (id) => {
    const findItem = cartInfo?.products?.find((item) => item?._id === id);
    const filterItem = cartInfo?.products?.filter(
      (item) => item?._id !== findItem?._id
    );
    dispatch(cartActions?.setCartInfo({ ...cartInfo, products: filterItem }));
  };
  return {
    cartInfo,
    onChangeQuantity,
    onDeleteProductInCart,
    total,
    subTotal,
  };
};

export default useCartPage;

import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartActions, updateCart } from "@/store/reducer/cartReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCartPage = () => {
  const dispatch = useDispatch();
  const { cartInfo, total, subTotal, discountCode, updateStatusUpdateCart } =
    useSelector((state) => state.cart);
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
  return {
    cartInfo,
    onChangeQuantity,
    onDeleteProductInCart,
    total,
    subTotal,
    discountCode,
    updateStatusUpdateCart,
  };
};

export default useCartPage;

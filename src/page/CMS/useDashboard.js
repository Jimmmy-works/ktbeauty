import React, { useEffect, useState } from "react";
import useWindowSize from "@/utils/windowResize";
import dashboardService from "@/service/dashboardService";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { register } from "@/store/reducer/authReducer";
import {
  createProduct,
  dashboardActions,
  getAllUsers,
} from "@/store/reducer/dashboardReducer";
import {
  getAllProduct,
  getProductDetail,
  productActions,
} from "@/store/reducer/productReducer";
import { deleteObject, ref } from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";
const useDashboard = () => {
  /// window size
  const { width } = useWindowSize();
  //// redux
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { users, searchUsers } = useSelector((state) => state.dashboard);
  const { categories, products, searchProducts } = useSelector(
    (state) => state.product
  );
  ///// Modal
  const [openModalAndt, setOpenModalAndt] = useState(false);
  const [productList, setProductList] = useState([]);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleInputSearch, setToggleInputSearch] = useState(false);
  const [toggleInputSeacrhMobile, setToggleInputSeacrhMobile] = useState(false);
  ////
  const onShowModal = (id) => {
    setOpenModalAndt(id);
  };
  const onCloseModal = (id) => {
    setOpenModalAndt(id);
  };
  const onAddProduct = (payload) => {
    setProductList([...productList, payload]);
  };
  ///// API

  //// API USER
  const onSearchUser = (userName) => {
    const result = users?.filter((user) => {
      return user?.name.includes(userName);
    });
    if (result === null || undefined || "") {
      dispatch(dashboardActions.setSearchUsers(users));
    } else {
      dispatch(dashboardActions.setSearchUsers(result));
    }
  };
  const onCreateUser = async (payload) => {
    try {
      const response = await dispatch(register(payload));
      dispatch(getAllUsers());
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  const onEditAvatar = async () => {
    try {
      const response = await dashboardService.deleteProfile();
    } catch (error) {
      console.log("error", error);
    }
  };
  const onDeleteUser = async (id) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await dashboardService.deleteProfile(id, _token);
      dispatch(getAllUsers());

      message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  //// API PRODUCT
  const onSearchProduct = (productName) => {
    const result = products?.filter((product) => {
      return product?.name.includes(productName);
    });
    if (result === null || undefined || "") {
      dispatch(productActions.setSearchProducts(products));
    } else {
      dispatch(productActions.setSearchProducts(result));
    }
    console.log("result", result);
  };
  const onGetProductDetail = (id) => {
    try {
      const response = dispatch(getProductDetail(id));
    } catch (error) {
      console.log("error", error);
    }
  };
  const onUpdateProduct = async (id, payload) => {
    try {
      const response = await dashboardService.updateProduct(id, payload);
      return response;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  const onDeleteImage = async (urls) => {
    console.log("urls", urls);
    try {
      // const responseUrls = await urls?.map((url) => {
      //   deleteObject(ref(firebaseStorage, url)).then((res) => {
      //     console.log("res");
      //   });
      // });
      // onUpdateProduct(ids, payload);
      // return responseUrls;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  const onCreateProduct = async (payload) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await dispatch(createProduct(payload));
      dispatch(getAllProduct(_token));
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  const onDeleteProduct = async (id) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await dashboardService.deleteProduct(id, _token);
      dispatch(getAllProduct());
      message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  const userProps = {
    onDeleteUser,
    onCreateUser,
    searchUsers,
  };
  const productProps = {
    categories,
    onCreateProduct,
    onDeleteProduct,
    onDeleteImage,
    onGetProductDetail,
    searchProducts,
  };
  const modalProps = {
    onShowModal,
    onCloseModal,
    openModalAndt,
    onAddProduct,
    productList,
    setProductList,
    profile,
    products,
    // getFirebaseStore,
    toggleSidebar,
    setToggleSidebar,
    toggleInputSearch,
    setToggleInputSearch,
    width,
    toggleInputSeacrhMobile,
    setToggleInputSeacrhMobile,
    onSearchUser,
    onSearchProduct,
  };
  return { modalProps, userProps, productProps };
};

export default useDashboard;

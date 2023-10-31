import React, { useEffect, useState } from "react";
import useWindowSize from "@/utils/windowResize";
import dashboardService from "@/service/dashboardService";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { register } from "@/store/reducer/authReducer";
import { createProduct, getAllUsers } from "@/store/reducer/dashboardReducer";
import { getAllProduct } from "@/store/reducer/productReducer";
const useDashboard = () => {
  /// window size
  const { width } = useWindowSize();
  //// redux
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { categories, products } = useSelector((state) => state.product);
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
  const adminToken = localStorage.getItem(LOCAL_STORAGE.token);
  //// API USER
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
  const onCreateProduct = async (payload) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await dispatch(createProduct(payload));
      console.log("response", response);
      dispatch(getAllProduct(_token));
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  const onDeleteProduct = async (id) => {
    console.log("id", id);
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
  // console.log("categories", categories);
  const userProps = {
    onDeleteUser,
    onCreateUser,
  };
  const productProps = {
    categories,
    onCreateProduct,
    onDeleteProduct,
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
  };
  return { modalProps, userProps, productProps };
};

export default useDashboard;

import React, { useEffect, useMemo, useState } from "react";
import useWindowSize from "@/utils/windowResize";
import dashboardService from "@/service/dashboardService";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { register } from "@/store/reducer/authReducer";
import {
  createProduct,
  dashboardActions,
  getAllOrder,
  getAllUsers,
} from "@/store/reducer/dashboardReducer";
import {
  getAllProduct,
  getProductDetail,
  productActions,
} from "@/store/reducer/productReducer";
import { deleteObject, ref } from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";
import useQuery from "@/hooks/useQuery";
import productService from "@/service/productService";
import { updataStatusOrder } from "@/store/reducer/orderReducer";
import { OPTION_SORT_ORDER } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
const useDashboard = () => {
  /// window size
  const { width } = useWindowSize();
  //// redux
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { users, searchUsers, orders, detailOrder } = useSelector(
    (state) => state.dashboard
  );
  const { categories, products, searchProducts } = useSelector(
    (state) => state.product
  );
  ///// Modal
  const [openModalAndt, setOpenModalAndt] = useState(false);
  const [productList, setProductList] = useState([]);
  const onShowModal = (id) => {
    setOpenModalAndt(id);
  };
  const onCloseModal = (id) => {
    setOpenModalAndt(id);
  };
  //// Sidebar
  const [toggleSidebar, setToggleSidebar] = useState(false);
  /// Search
  const [toggleInputSearch, setToggleInputSearch] = useState(false);
  const [toggleInputSeacrhMobile, setToggleInputSeacrhMobile] = useState(false);
  ///// API
  //// CRUD USER
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
  //// CRUD PRODUCT
  const _limit = 9;
  const _page = 0;
  // const { data: dataProducts, loading: loadingProducts } = useQuery(() =>
  //   productService.getAllProduct({ limit: _limit, page: _page })
  // );
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
  const onUpdateProduct = async (id, payload) => {
    try {
      const response = await dashboardService.updateProduct(id, payload);
      console.log("response", response);
      message.success(response?.data?.message);
      if (response?.status === 200) {
        dispatch(getAllProduct());
      }
      return response?.data?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  const onDeleteImageFirebase = async (urls) => {
    try {
      const responseUrls = await deleteObject(ref(firebaseStorage, urls));
      return responseUrls;
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
  //// CRUD ORDER'
  const [optionSortSelectedOrder, setOptionSortSelectedOrder] = useState(
    OPTION_SORT_ORDER.ALL
  );
  const onSortOrder = useMemo(() => {
    let newOrders = [];
    switch (optionSortSelectedOrder) {
      case OPTION_SORT_ORDER.ALL:
        return (newOrders = orders?.filter((order) => order));
      case OPTION_SORT_ORDER.VERIFY:
        return (newOrders = orders?.filter(
          (order) => order?.status === "Đang xác minh"
        ));
      case OPTION_SORT_ORDER.VERIFIED:
        return (newOrders = orders?.filter(
          (order) => order?.status === "Đã xác minh"
        ));
      case OPTION_SORT_ORDER.PREPARING:
        return (newOrders = orders?.filter(
          (order) => order?.status === "Đang chuẩn bị hàng"
        ));
      case OPTION_SORT_ORDER.DELIVERY:
        return (newOrders = orders?.filter(
          (order) => order?.status === "Đang giao hàng"
        ));
      case OPTION_SORT_ORDER.COMPLETE:
        return (newOrders = orders?.filter(
          (order) => order?.status === "Hoàn thành đơn hàng"
        ));
      case OPTION_SORT_ORDER.CANCEL:
        return (newOrders = orders?.filter(
          (order) => order?.status === "Đã hủy đơn"
        ));
      default:
        break;
    }
  }, [optionSortSelectedOrder, orders]);

  const onChangeSelectOrder = (name) => {
    setOptionSortSelectedOrder(name);
  };
  const optionSortOrderCMS = [
    { value: 1, name: "all", label: "Tất cả" },
    { value: 2, name: "verify", label: "Đang xác minh" },
    { value: 3, name: "verified", label: "Đã xác minh" },
    { value: 4, name: "preparing", label: "Đang chuẩn bị hàng" },
    { value: 5, name: "delivery", label: "Đang giao hàng" },
    { value: 6, name: "complete", label: "Hoàn thành đơn hàng" },
    { value: 7, name: "cancel", label: "Đã hủy đơn" },
  ];
  const onDeleteOrder = async (id) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE.token);
      const response = await dashboardService.deleteOrder(id, _token);
      if (response?.status === 200) {
        dispatch(getAllOrder());
        message.success(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };

  const onConfirmOrder = async (payload) => {
    try {
      const response = await dispatch(updataStatusOrder(payload));
      console.log("response", response);
      if (response?.meta?.arg?.requestStatus === THUNK_STATUS.fulfilled) {
        dispatch(getAllOrder());
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  const orderProps = {
    orders,
    detailOrder,
    onDeleteOrder,
    profile,
    onConfirmOrder,
    optionSortOrderCMS,
    onChangeSelectOrder,
    onSortOrder,
    optionSortSelectedOrder,
  };
  const userProps = {
    onDeleteUser,
    onCreateUser,
    searchUsers,
    users,
  };
  const productProps = {
    categories,
    products,
    onCreateProduct,
    onDeleteProduct,
    onDeleteImageFirebase,
    onUpdateProduct,
    searchProducts,
  };
  const modalProps = {
    onShowModal,
    onCloseModal,
    openModalAndt,
    productList,
    setProductList,
    profile,
    products,
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
  return { modalProps, userProps, productProps, orderProps };
};

export default useDashboard;

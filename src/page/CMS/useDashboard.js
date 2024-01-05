import { firebaseStorage } from "@/config/firebase";
import { _LIMIT } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import useMutation from "@/hooks/useMutation";
import dashboardService from "@/service/dashboardService";
import productService from "@/service/productService";
import { register } from "@/store/reducer/authReducer";
import {
  createProduct,
  getAllOrder,
  getAllUsers,
  getTopRate,
  getRevenue,
  getSoldProducts,
} from "@/store/reducer/dashboardReducer";
import { updataStatusOrder } from "@/store/reducer/orderReducer";
import {
  getAllCategories,
  getAllProduct,
} from "@/store/reducer/productReducer";
import useWindowSize from "@/utils/windowResize";
import { message } from "antd";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useDashboard = () => {
  /// token
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  /// window size
  const { width } = useWindowSize();
  //// redux
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const {
    users,
    statusGetAllUsers,
    orders,
    statusGetAllOrders,
    detailOrder,
    soldProducts,
    revenue,
    inventory,
  } = useSelector((state) => state.dashboard);
  const {
    categories,
    statusGetAllCategories,
    products,
    statusGetAllProducts,
    totalProducts,
  } = useSelector((state) => state.product);
  ///// Modal
  const [openModalAndt, setOpenModalAndt] = useState("");
  const [productList, setProductList] = useState([]);
  const onShowModal = (id) => {
    setOpenModalAndt(id);
  };
  const onCloseModal = () => {
    setOpenModalAndt("");
  };
  //// Sidebar
  const [toggleSidebar, setToggleSidebar] = useState(false);
  /// Search
  const [toggleInputSearch, setToggleInputSearch] = useState(false);
  const [toggleInputSeacrhMobile, setToggleInputSeacrhMobile] = useState(false);
  ///// API
  //// CRUD USER
  const onCreateUser = async (payload) => {
    try {
      const response = await dispatch(register(payload));
      if (response?.payload?.status === 200) {
        dispatch(getAllUsers());
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  const onDeleteUser = async (id) => {
    try {
      const response = await dashboardService.deleteProfile(id, _token);
      dispatch(getAllUsers());
      message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  //// CRUD PRODUCT
  const onUpdateProduct = async (id, payload) => {
    try {
      const response = await dashboardService.updateProduct(id, payload);
      message.success(response?.data?.message);
      if (response?.status === 200) {
        dispatch(getAllProduct());
      }
      return response?.data?.data;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
      throw error;
    }
  };
  const {
    data: dataUpdateProduct,
    loading: loadingUpdateProduct,
    execute: executeUpdateProduct,
  } = useMutation(dashboardService.updateProduct, {
    onSuccess: () => {
      onCloseModal();
      dispatch(getAllProduct());
    },
    onFail: (error) => {
      console.log("error", error);
    },
  });
  const {
    data: dataDeleteProduct,
    loading: loadingDeleteProduct,
    execute: executeDeleteProduct,
  } = useMutation(dashboardService.updateProduct, {
    onSuccess: (e) => {
      dispatch(getAllProduct());
    },
    onFail: (error) => {
      console.log("error", error);
    },
  });
  const {
    data: dataCreateProduct,
    loading: loadingCreateProduct,
    execute: executeCreateProduct,
  } = useMutation(dashboardService.createProduct, {
    onSuccess: () => {
      onCloseModal();
      dispatch(getAllProduct());
    },
    onFail: (error) => {
      console.log("error", error);
    },
  });
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
      const response = await dispatch(createProduct(payload));
      dispatch(getAllProduct());
      return response;
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  const onDeleteProduct = async (id) => {
    try {
      const response = await dashboardService.deleteProduct(id, _token);
      dispatch(getAllProduct());
      message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  //// CRUD ORDER
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
      if (response?.payload?.status === 200) {
        dispatch(getAllOrder());
      }
      return response;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  //// CRUD CATEGORY
  const onCreateCategory = async (payload) => {
    try {
      const response = await dashboardService.createCategory(payload, _token);
      if (response?.status === 200) {
        dispatch(getAllCategories());
        message.success(response?.data?.message);
        onCloseModal();
      }
      return response;
    } catch (error) {
      console.log("error", error);
    }
  };
  const onUpdateCategory = async (payload) => {
    try {
      const response = await dashboardService.updateCategory(payload, _token);
      if (response?.status === 200) {
        dispatch(getAllCategories());
        message.success(response.data?.message);
        onCloseModal();
      }
      return response;
    } catch (error) {
      console.log("error", error);
    }
  };
  const onDeleteCategory = async (id) => {
    try {
      const response = await dashboardService.deleteCategory(id, _token);
      if (response?.status === 200) {
        dispatch(getAllCategories());
        message.success(response?.data?.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  /////// Analyst
  const onGetSoldProducts = (payload) => {
    return dispatch(getSoldProducts(payload)).unwrap();
  };
  const onGetRevenue = (payload) => {
    return dispatch(getRevenue(payload)).unwrap();
  };
  const onGetInventory = (param) => {
    return dispatch(getTopRate(param)).unwrap();
  };
  const categoryProps = {
    categories,
    onCreateCategory,
    onDeleteCategory,
    onUpdateCategory,
    statusGetAllCategories,
  };
  const orderProps = {
    orders,
    detailOrder,
    onDeleteOrder,
    profile,
    onConfirmOrder,
    optionSortOrderCMS,
    statusGetAllOrders,
  };
  const userProps = {
    onDeleteUser,
    onCreateUser,
    users,
    statusGetAllUsers,
  };
  const productProps = {
    categories,
    products,
    onCreateProduct,
    onDeleteProduct,
    onDeleteImageFirebase,
    onUpdateProduct,
    statusGetAllProducts,
    ///
    loadingUpdateProduct,
    executeUpdateProduct,
    dataUpdateProduct,
    ///
    dataDeleteProduct,
    loadingDeleteProduct,
    executeDeleteProduct,
    ///
    dataCreateProduct,
    loadingCreateProduct,
    executeCreateProduct,
    ///
    statusGetAllProducts,
    totalProducts,
  };
  const analystProps = {
    soldProducts,
    revenue,
    inventory,
    onGetSoldProducts,
    onGetInventory,
    onGetRevenue,
    categories,
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
  };
  return {
    modalProps,
    userProps,
    productProps,
    orderProps,
    categoryProps,
    analystProps,
  };
};

export default useDashboard;

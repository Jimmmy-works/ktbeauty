import { firebaseStorage } from "@/config/firebase";
import { OPTION_SORT_ORDER } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import dashboardService from "@/service/dashboardService";
import { register } from "@/store/reducer/authReducer";
import {
  createProduct,
  dashboardActions,
  getAllOrder,
  getAllUsers,
} from "@/store/reducer/dashboardReducer";
import { updataStatusOrder } from "@/store/reducer/orderReducer";
import {
  getAllCategories,
  getAllProduct,
  productActions,
} from "@/store/reducer/productReducer";
import { removeAccents } from "@/utils/removeAccents";
import useWindowSize from "@/utils/windowResize";
import { message } from "antd";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useDashboard = () => {
  /// token
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  /// window size
  const { width } = useWindowSize();
  //// redux
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { users, searchUsers, orders, detailOrder, searchOrders } = useSelector(
    (state) => state.dashboard
  );
  const { categories, products, searchProducts, searchCategory } = useSelector(
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
      return removeAccents(user?.email)
        ?.toLowerCase()
        ?.includes(removeAccents(userName?.toLowerCase()));
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
  const onSearchProduct = (productName) => {
    let result;
    if (searchProducts?.length) {
      result = products?.filter((product) => {
        return removeAccents(product?.name)
          ?.toLowerCase()
          ?.includes(removeAccents(productName?.toLowerCase()));
      });
    } else {
      result = products;
    }

    if (result === null || undefined || "") {
      dispatch(productActions.setSearchProducts([...products]));
    } else {
      dispatch(productActions.setSearchProducts(result));
    }
    return result;
  };
  const onUpdateProduct = async (payload) => {
    try {
      const response = await dashboardService.updateProduct(payload);
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
      const response = await dashboardService.deleteProduct(id, _token);
      dispatch(getAllProduct());
      message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.log("error", error);
    }
  };
  //// CRUD ORDER
  const [optionSortSelectedOrder, setOptionSortSelectedOrder] = useState(
    OPTION_SORT_ORDER.ALL
  );
  const onSearchOrder = (orderName) => {
    const result = orders?.filter((order) => {
      return removeAccents(order?.user?.email)?.includes(
        removeAccents(orderName?.toLowerCase())
      );
    });
    if (result === null || undefined || "") {
      dispatch(dashboardActions.setSearchOrders(orders));
    } else {
      dispatch(dashboardActions.setSearchOrders(result));
    }
  };
  const onSortOrder = useMemo(() => {
    let newOrders = [];
    if (!searchOrders?.length) {
      newOrders = orders;
    }
    switch (optionSortSelectedOrder) {
      case OPTION_SORT_ORDER.ALL:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter((order) => order);
        }
        return newOrders;
      case OPTION_SORT_ORDER.VERIFY:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter(
            (order) => order?.status === "Đang xác minh"
          );
        }
        return newOrders;
      case OPTION_SORT_ORDER.VERIFIED:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter(
            (order) => order?.status === "Đã xác minh"
          );
        }
        return newOrders;
      case OPTION_SORT_ORDER.PREPARING:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter(
            (order) => order?.status === "Đang chuẩn bị hàng"
          );
        }
        return newOrders;
      case OPTION_SORT_ORDER.DELIVERY:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter(
            (order) => order?.status === "Đang giao hàng"
          );
        }
        return newOrders;
      case OPTION_SORT_ORDER.COMPLETE:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter(
            (order) => order?.status === "Hoàn thành đơn hàng"
          );
        }
        return newOrders;
      case OPTION_SORT_ORDER.CANCEL:
        if (searchOrders?.length) {
          newOrders = searchOrders?.filter(
            (order) => order?.status === "Đã hủy đơn"
          );
        }
        return newOrders;
      default:
        break;
    }
  }, [optionSortSelectedOrder, orders, searchOrders]);
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
  const onSearchCategory = (categoryName) => {
    const result = categories?.filter((category) => {
      return removeAccents(category?.name)
        ?.toLowerCase()
        ?.includes(removeAccents(categoryName?.toLowerCase()));
    });
    if (result === null || undefined || "") {
      dispatch(productActions.setSearchCategories([...categories]));
    } else {
      dispatch(productActions.setSearchCategories(result));
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
  useEffect(() => {
    onSearchOrder("");
    onSearchProduct("");
    onSearchCategory("");
  }, []);
  const categoryProps = {
    categories,
    onCreateCategory,
    onDeleteCategory,
    onUpdateCategory,
    searchCategory,
    onSearchCategory,
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
    searchOrders,
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
    onSearchCategory,
    onSearchOrder,
  };
  return { modalProps, userProps, productProps, orderProps, categoryProps };
};

export default useDashboard;

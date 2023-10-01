import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const useDashboard = () => {
  ///// Modal
  const [openModalAndt, setOpenModalAndt] = useState(false);
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);
  const onShowModal = () => {
    setOpenModalAndt(true);
  };
  const onCloseModal = () => {
    setOpenModalAndt(false);
  };
  const onAddProduct = (payload) => {
    console.log("payload", payload);
    setProductList([...productList, payload]);
  };
  //   const onOk = (payload) => {
  //     const payload = {
  //       name: name,
  //       price: price,
  //       image: img,
  //     };
  //     console.log("payload", payload);
  //     setListProduct([...listProduct, payload]);
  //     message.success("Success add product");
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   };
  //// Header CMS
  const { pathname } = useLocation();
  const [path, setPath] = useState("");
  const pathCMS = [
    {
      id: "1",
      path: "/cms",
      button: " Create User",
      success: "Success Create User",
    },
    {
      id: "2",
      path: "/cms/product",
      button: "Create Product",
      success: "Success Create Product",
    },
    {
      id: "3",
      path: "/cms/image",
      button: "Create Product",
      success: "Success Create Product",
    },
    {
      id: "4",
      path: "/cms/team",
      button: "Create Product",
      success: "Success Create Product",
    },
    {
      id: "5",
      path: "/cms/file",
      button: "Create Product",
      success: "Success Create Product",
    },
  ];
  const findPath = pathCMS?.find((item) => item?.path === path);
  console.log("productList", productList);
  useEffect(() => {
    setPath(pathname);
  }, [pathname, findPath]);
  const modalProps = {
    onShowModal,
    onCloseModal,
    openModalAndt,
    onAddProduct,
    productList,
    setProductList,
    findPath,
    pathCMS,
  };
  return { modalProps };
};

export default useDashboard;

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { firebaseStore } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
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
    setProductList([...productList, payload]);
  };
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
  ////// firebase
  const productCollectionRef = collection(firebaseStore, "product-card");
  const getFirebaseStore = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      const filterData = data?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return setProductList(filterData);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getFirebaseStore();
  }, [JSON.stringify(productCollectionRef)]);
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
    getFirebaseStore,
  };
  return { modalProps };
};

export default useDashboard;

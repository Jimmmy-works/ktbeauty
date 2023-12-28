import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { authActions, register, signin } from "@/store/reducer/authReducer";
import { cartActions, updateCart } from "@/store/reducer/cartReducer";
import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MainContext = createContext({});
export const MainProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { updateStatusRegister, updateStatusLogin } = useSelector(
    (state) => state.auth
  );
  const { cartInfo } = useSelector((state) => state.cart);
  ///// Category
  const [categoryGlobalTab, setCategoryGlobalTab] = useState();
  const onChangeCategoryGlobal = (tab) => {
    setCategoryGlobalTab(tab);
  };
  ///// Nav + Filter Nav
  const [isNavbar, setIsNavbar] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [dropDownNav, setdropDownNav] = useState(false);
  const navigate = useNavigate();
  const onToggleNav = () => {
    setIsNavbar(!isNavbar);
    if (isNavbar) {
      setdropDownNav(false);
      document
        .querySelector("main")
        ?.setAttribute("style", "transform: translateX(0px)");
      document.body?.setAttribute("style", "overflow-y : scroll");
    } else {
      document
        .querySelector("main")
        ?.setAttribute("style", "transform: translateX(150px)");
      document.body.setAttribute("style", "overflow-y: hidden");
    }
  };
  const onToggleFilter = () => {
    setIsFilter(!isFilter);
    if (isFilter) {
      setdropDownNav(false);
      document.body?.setAttribute("style", "overflow-y : scroll");
    } else {
      document.body.setAttribute("style", "overflow-y: hidden");
    }
  };
  /////// Authen
  const [isAuthenModal, setIsAuthenModal] = useState(false);
  const [controlAuthen, setControlAuthen] = useState("");
  const onAuthenModal = (form) => {
    setIsAuthenModal(!isAuthenModal);
    setControlAuthen(form);
  };
  const onLogin = async (payload) => {
    try {
      const res = await dispatch(signin(payload));
      if (res.meta.requestStatus === THUNK_STATUS.fulfilled) {
        setIsAuthenModal(false);
        setControlAuthen("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onLogout = async () => {
    try {
      // if (Object.values(cartInfo).length !== 0) {
      //   const _token = localStorage.getItem(LOCAL_STORAGE.token);
      //   const resUpdateCart = await dispatch(
      //     updateCart({ ...cartInfo }, _token)
      //   );
      //   if (resUpdateCart?.payload?.status === 200) {
      //     dispatch(cartActions.setCartInfo(null));
      //     dispatch(authActions.logout());
      //     setIsNavbar(false);
      //   }
      // } else {
      //   dispatch(cartActions.setCartInfo(null));
      //   dispatch(authActions.logout());
      // }
      // navigate("/");
      dispatch(authActions.logout());
    } catch (error) {
      console.log("error", error);
    }
  };
  const onRegister = async (payload) => {
    try {
      const res = await dispatch(register(payload));
      if (
        updateStatusRegister !== THUNK_STATUS.pending &&
        updateStatusRegister === res.meta.requestStatus &&
        updateStatusRegister !== THUNK_STATUS.rejected
      ) {
        setIsAuthenModal(false);
        setControlAuthen("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onOpenLogin = () => {
    setControlAuthen("login");
  };
  const onOpenRegister = () => {
    setControlAuthen("register");
  };
  ///// Profile Active Tab
  const [activeLinkTab, setActiveLinkTab] = useState("");
  const onActiveLinkTab = (link) => {
    setActiveLinkTab(link);
  };
  ///// Modal Antd
  return (
    <MainContext.Provider
      value={{
        ///// Nav + Filter Nav
        isNavbar,
        onToggleNav,
        setIsNavbar,
        onToggleFilter,
        setIsFilter,
        isFilter,
        dropDownNav,
        /// Authen
        onLogin,
        onLogout,
        onOpenLogin,
        onOpenRegister,
        onAuthenModal,
        isAuthenModal,
        setIsAuthenModal,
        controlAuthen,
        onRegister,
        updateStatusRegister,
        updateStatusLogin,
        //Profile Active Tab
        activeLinkTab,
        setActiveLinkTab,
        onActiveLinkTab,
        // Category
        categoryGlobalTab,
        onChangeCategoryGlobal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export const useMainContext = () => useContext(MainContext);

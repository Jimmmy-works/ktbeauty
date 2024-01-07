import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/path";
import useDebounce from "@/hooks/useDebounce";
import { getProfileSlug } from "@/store/reducer/authReducer";
import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";

const PrivateRouteCMS = () => {
  const dispatch = useDispatch();
  const { profile, updateStatusUser } = useSelector((state) => state.auth);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (_token) {
      dispatch(getProfileSlug());
    }
  }, []);
  const debounceProfile = useDebounce(profile, 500);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!debounceProfile || !debounceProfile?.isAdmin) {
        navigate(PATHS.HOME);
        message.error("Bạn chưa đăng nhập hoặc không đủ quyền truy cập");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [debounceProfile]);
  if (!debounceProfile || !debounceProfile?.isAdmin) {
    return <LoadingPage />;
  } else {
    return <Outlet></Outlet>;
  }
};
export default PrivateRouteCMS;

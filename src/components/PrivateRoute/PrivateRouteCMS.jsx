import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { getProfileSlug } from "@/store/reducer/authReducer";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { PATHS } from "@/contants/path";
import { message } from "antd";

const PrivateRouteCMS = () => {
  const dispatch = useDispatch();
  const { profile, updateStatusUser } = useSelector((state) => state.auth);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const navigate = useNavigate();
  if (updateStatusUser === THUNK_STATUS) {
    if (!profile && !profile?.isAdmin) {
      navigate(PATHS.HOME);
    }
  }
  useEffect(() => {
    if (_token) {
      dispatch(getProfileSlug());
    }
  }, []);
  useEffect(() => {
    if (!profile || !profile?.isAdmin) {
      const timeout = setTimeout(() => {
        navigate(PATHS.HOME);
        message.error("Bạn chưa đăng nhập hoặc không đủ quyền truy cập");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);
  if (!profile || !profile?.isAdmin) {
    return <LoadingPage />;
  } else {
    return <Outlet></Outlet>;
  }
};
export default PrivateRouteCMS;

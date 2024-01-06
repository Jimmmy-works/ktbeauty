import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { PATHS } from "@/contants/path";
import { message } from "antd";

const PrivateRoute = () => {
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      const timeout = setTimeout(() => {
        navigate(PATHS.HOME);
        message.error("Bạn chưa đăng nhập");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);
  if (!profile) {
    return <LoadingPage />;
  } else {
    return <Outlet></Outlet>;
  }
};
export default PrivateRoute;

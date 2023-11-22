import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import axios from "axios";
import { BASE_URL } from "@/contants/environment";
import authService from "@/service/authService";

export default function PrivateRoute({
  children,
  redirectPath = `${PATHS.HOME}`,
}) {
  const { pathname } = useLocation();
  let token = localStorage.getItem(LOCAL_STORAGE.token);
  const { statusGetOrderUser } = useSelector((state) => state.order);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const checkAuth = async () => {
    setIsLoading(true); // <-- set true when starting auth check
    try {
      const res = await authService.signin({});
      console.log("res", res);
      setIsAuthenticated(true);
    } catch (e) {
      console.error(e);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); // <-- clear loading state when completed
    }
  };
  useEffect(() => {
    checkAuth();
  }, [pathname]); // <-- check auth status on mount/when location changes

  if (isLoading) {
    console.log("loading....");
    return <LoadingPage />;
  }
  // if (!!!token) {
  //   message.error(`Xin vui lòng đăng nhập`);
  //   return <Navigate to={redirectPath} />;
  // }
  return isAuthenticated ? children || <Outlet /> : <Navigate to={"/"} />;
  // return (
  //   <>
  //     <Outlet />
  //   </>
  // );
}

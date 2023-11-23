import { LOCAL_STORAGE } from "@/contants/localStorage";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = () => {
  const { profile } = useSelector((state) => state.auth);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!_token) {
      navigate("/");
    }
  }, []);
  if (!profile || profile === null) {
    return <LoadingPage />;
  }
  return <Outlet></Outlet>;
};
export default PrivateRoute;

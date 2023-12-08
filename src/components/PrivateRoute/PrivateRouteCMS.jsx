import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";

const PrivateRouteCMS = () => {
  const { profile } = useSelector((state) => state.auth);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!_token) {
      navigate("/");
    }
    // if (!profile || !_token || !profile?.isAdmin) {
    //   navigate("/");
    // }
  }, [profile]);
  // if (!profile || !profile?.isAdmin) {
  //   return <LoadingPage />;
  // }
  return <Outlet></Outlet>;
};
export default PrivateRouteCMS;

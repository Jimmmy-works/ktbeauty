import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";

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

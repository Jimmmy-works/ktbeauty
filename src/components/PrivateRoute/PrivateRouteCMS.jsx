import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { getProfileSlug } from "@/store/reducer/authReducer";
import { decodeToken } from "react-jwt";

const PrivateRouteCMS = () => {
  const { profile } = useSelector((state) => state.auth);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!profile || !_token || !profile?.isAdmin) {
      navigate("/");
    }
  }, [profile]);
  if (!profile || !profile?.isAdmin) {
    return <LoadingPage />;
  }
  return <Outlet></Outlet>;
};
export default PrivateRouteCMS;

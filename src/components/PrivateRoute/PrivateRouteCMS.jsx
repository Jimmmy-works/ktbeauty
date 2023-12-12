import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { getProfileSlug } from "@/store/reducer/authReducer";
import { THUNK_STATUS } from "@/contants/thunkstatus";

const PrivateRouteCMS = () => {
  const dispatch = useDispatch();
  const { profile, updateStatusUser } = useSelector((state) => state.auth);
  const _token = localStorage.getItem(LOCAL_STORAGE.token);
  const navigate = useNavigate();
  if (updateStatusUser === THUNK_STATUS) {
    if (!profile && !profile?.isAdmin) {
      navigate("/");
    }
  }
  useEffect(() => {
    if (_token) {
      dispatch(getProfileSlug());
    }
  }, []);
  if (!profile || !profile?.isAdmin) {
    return <LoadingPage />;
  }
  return <Outlet></Outlet>;
};
export default PrivateRouteCMS;

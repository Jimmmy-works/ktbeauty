import { useMainContext } from "@/components/MainContext";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { provinceService } from "@/service/provinceService";
import { changePassword, updateProfile } from "@/store/reducer/authReducer";
import { updateCart } from "@/store/reducer/cartReducer";
import { getOrderUser, updataStatusOrder } from "@/store/reducer/orderReducer";
import { updateWhiteList } from "@/store/reducer/whitelistReducer";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useProfile = () => {
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");
  const { profile, updateStatusProfile } = useSelector((state) => state.auth);
  const { updateStatusUpdateCart, cartInfo } = useSelector(
    (state) => state.cart
  );
  const { orderList, statusGetOrderUser } = useSelector((state) => state.order);
  const { statusUpdateWhiteList } = useSelector((state) => state.whitelist);
  const { whiteListInfo, statusGetWhiteList } = useSelector(
    (state) => state.whitelist
  );
  const dispatch = useDispatch();
  //// Handle Province
  const getProvinces = async () => {
    try {
      const dataProvince = await provinceService.getCity();
      const _provinces = dataProvince?.data?.data?.provinces?.map(
        (province) => {
          return {
            value: province?.id,
            label: province?.name,
          };
        }
      );
      setProvinces(_provinces);
      return dataProvince;
    } catch (error) {
      console.log("error", error);
    }
  };
  const getDistricts = async (provinceId) => {
    try {
      const dataDistrict = await provinceService.getDistrict(provinceId);
      if (dataDistrict?.data) {
        const _distrists = dataDistrict?.data?.data?.districts?.map(
          (district) => {
            return {
              value: district?.id,
              label: district?.name,
            };
          }
        );
        setDistricts(_distrists);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const getWards = async (distristId) => {
    try {
      const dataWards = await provinceService.getWard(distristId);
      if (dataWards?.data) {
        const _wards = dataWards?.data?.data?.wards?.map((ward) => {
          return {
            value: ward?.id,
            label: ward?.name,
          };
        });
        setWards(_wards);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangeProvince = (_provinceId) => {
    getDistricts(_provinceId);
    setProvinceId(_provinceId);
    setWardId("");
    setDistrictId("");
  };
  const onChangeDistrict = (_districtId) => {
    getWards(_districtId);
    setDistrictId(_districtId);
    setWardId("");
  };
  const onChangeWard = (_wardId) => {
    setWardId(_wardId);
  };
  ////////
  const onUpdateProfile = async (payload) => {
    try {
      await dispatch(updateProfile(payload));
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangePassword = async (payload) => {
    try {
      await dispatch(changePassword(payload));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getProvinces();
    if (profile?.province?._id) {
      onChangeProvince(profile?.province?._id);
      onChangeDistrict(profile?.district?._id);
      onChangeWard(profile?.ward?._id);
    }
  }, [profile?.province?._id]);
  //////// ORder
  const onCancelOrder = (payload) => {
    dispatch(updataStatusOrder(payload));
  };
  const [pageCurrent, setPageCurrent] = useState(1);
  const onChangePageCurrent = (pageNumb) => {
    setPageCurrent(pageNumb);
  };
  console.log("pageCurrent", pageCurrent);
  useEffect(() => {
    if (
      statusGetOrderUser !== THUNK_STATUS.pending ||
      statusGetOrderUser !== THUNK_STATUS.rejected
    ) {
      dispatch(
        getOrderUser(
          { limit: 5, page: pageCurrent ? pageCurrent - 1 : 1 },
          localStorage.getItem(LOCAL_STORAGE.token)
        )
      );
    }
  }, [pageCurrent]);
  //// whiteList
  const onAddToCart = async (payload) => {
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    try {
      if (_token) {
        if (payload?._id && updateStatusUpdateCart !== THUNK_STATUS.pending) {
          let cartPayload = {};
          const matchIndex = cartInfo?.products?.findIndex(
            (productMatched) => productMatched?.product_id === payload?._id
          );
          let newProductPayload = cartInfo?.products?.map((product) => product);
          if (cartInfo?._id) {
            if (matchIndex > -1) {
              if (newProductPayload[matchIndex]?.quantity >= 20) {
                return message.error(
                  `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
                );
              } else {
                newProductPayload[matchIndex] = {
                  ...newProductPayload[matchIndex],
                  quantity: newProductPayload[matchIndex]?.quantity + 1,
                };
                message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
              }
            } else {
              newProductPayload.push({
                ...payload,
                quantity: 1,
                product_id: payload?._id,
              });
              message.success(`+1 ${payload?.name}`);
            }
            cartPayload = {
              ...cartInfo,
              products: newProductPayload,
            };
          } else {
            cartPayload = {
              ...cartInfo,
              products: newProductPayload,
            };
            if (matchIndex > -1) {
              if (newProductPayload[matchIndex]?.quantity >= 20) {
                return message.error(
                  `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
                );
              } else {
                newProductPayload[matchIndex] = {
                  ...newProductPayload[matchIndex],
                  quantity: newProductPayload[matchIndex]?.quantity + 1,
                };
                message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
              }
            } else {
              newProductPayload.push({
                ...payload,
                quantity: 1,
                product_id: payload?._id,
              });
              message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
            }
          }
          dispatch(updateCart(cartPayload));
        }
      } else {
        onAuthenModal("login");
        return message.error(`Xin vui lòng đăng nhập để thêm sản phẩm`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onDeleteProductInWhiteList = (id) => {
    let whiteListPayload = {};
    const findItem = whiteListInfo?.products?.find((item) => item?._id === id);
    const filterItem = whiteListInfo?.products?.filter(
      (item) => item?._id !== findItem?._id
    );
    whiteListPayload = {
      ...whiteListInfo,
      products: filterItem,
    };
    dispatch(updateWhiteList(whiteListPayload));
  };
  return {
    provinces,
    districts,
    wards,
    profile,
    provinceId,
    districtId,
    wardId,
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    onUpdateProfile,
    onChangePassword,
    getProvinces,
    getDistricts,
    getWards,
    orderList,
    onCancelOrder,
    updateStatusProfile,
    pageCurrent,
    onChangePageCurrent,
    statusGetOrderUser,
    //////
    whiteListInfo,
    statusGetWhiteList,
    onDeleteProductInWhiteList,
    onAddToCart,
  };
};

export default useProfile;

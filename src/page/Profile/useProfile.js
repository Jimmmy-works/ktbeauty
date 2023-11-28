import { provinceService } from "@/service/provinceService";
import { changePassword, updateProfile } from "@/store/reducer/authReducer";
import {
  updataStatusOrder,
  getOrderUser,
  orderActions,
} from "@/store/reducer/orderReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProfile = () => {
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");
  const { profile } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);
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
      const response = await dispatch(updateProfile(payload));
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangePassword = async (payload) => {
    try {
      const response = await dispatch(changePassword(payload));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getProvinces();
    if (provinceId || profile?.province?._id) {
      getDistricts(profile?.province?._id);
    }
    if (districtId || profile?.district?._id) {
      getWards(profile?.district?._id);
    }
  }, [profile?.province?._id]);
  //////// ORder
  const onCancelOrder = (payload) => {
    console.log("payload", payload);
    dispatch(updataStatusOrder(payload));
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
  };
};

export default useProfile;

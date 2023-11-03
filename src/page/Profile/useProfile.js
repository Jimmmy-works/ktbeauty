import { provinceService } from "@/service/provinceService";
import { changePassword, updateProfile } from "@/store/reducer/authReducer";
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
  const dispatch = useDispatch();
  //// Handle Province
  const getProvinces = async () => {
    try {
      const dataProvince = await provinceService.getCity();

      const _provinces = dataProvince?.data?.results?.map((province) => {
        return {
          value: province?.province_id,
          label: province?.province_name,
        };
      });
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
        const _distrists = dataDistrict?.data?.results?.map((district) => {
          return {
            value: district?.district_id,
            label: district?.district_name,
          };
        });
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
        const _wards = dataWards?.data?.results?.map((ward) => {
          return {
            value: ward?.ward_id,
            label: ward?.ward_name,
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
    if (provinceId) {
      getDistricts();
    }
    if (districtId) {
      getWards();
    }
  }, [profile]);
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
  };
};

export default useProfile;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useProfile from "../Profile/useProfile";
import { provinceService } from "@/service/provinceService";

const useCheckout = () => {
  const dispatch = useDispatch();
  const { cartInfo, shipping, discountCode, total, subTotal } = useSelector(
    (state) => state.cart
  );
  const { profile } = useSelector((state) => state.auth);
  const [controlSwitch, setControlSwitch] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");
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
  const onToggleSwitch = () => {
    setControlSwitch(!controlSwitch);
  };
  useEffect(() => {
    getProvinces();
    if (provinceId) {
      getDistricts();
    }
    if (districtId) {
      getWards();
    }
  }, []);
  return {
    onToggleSwitch,
    controlSwitch,
    profile,
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    cartInfo,
    shipping,
    discountCode,
    total: cartInfo?.total,
    subTotal: cartInfo?.subTotal,
  };
};

export default useCheckout;

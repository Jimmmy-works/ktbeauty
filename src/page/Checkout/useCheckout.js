import { provinceService } from "@/service/provinceService";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const useCheckout = () => {
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
  const onToggleSwitch = () => {
    setControlSwitch(!controlSwitch);
  };
  const form = useForm({
    mode: "all",
  });
  const handleControlSwitch = useCallback(() => {
    if (profile && profile?.province?._id) {
      if (!controlSwitch) {
        form?.setValue("name");
        form?.setValue("email");
        form?.setValue("phone");
        form?.setValue("address");
        form?.setValue("province");
        form?.setValue("district");
        form?.setValue("ward");
        setProvinceId(undefined);
        setDistrictId(undefined);
        setWardId(undefined);
        form?.setValue("note");
      } else {
        form?.setValue("name", profile?.name);
        form?.setValue("email", profile?.email);
        form?.setValue("phone", profile?.phone);
        form?.setValue("address", profile?.address);
        form?.setValue("province", profile?.province?._id);
        form?.setValue("district", profile?.district?._id);
        form?.setValue("ward", profile?.ward?._id);
        getProvinces();
        onChangeProvince(profile?.province?._id);
        if (profile?.province?._id) onChangeDistrict(profile?.district?._id);
        if (profile?.district?._id) onChangeWard(profile?.ward?._id);

        form?.setValue("note", profile?.note);
      }
    }
  }, [profile, controlSwitch]);
  useEffect(() => {
    handleControlSwitch();
    const timeout = setTimeout(() => {
      form?.trigger([
        "phone",
        "email",
        "address",
        "name",
        "province",
        "district",
        "ward",
      ]);
    }, 400);
    return () => clearTimeout(timeout);
  }, [controlSwitch]);
  useEffect(() => {
    form?.reset({
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      address: profile?.address,
      province: profile?.province?._id,
      district: profile?.district?._id,
      ward: profile?.ward?._id,
      province: profile?.province?._id,
      district: profile?.district?._id,
      ward: profile?.ward?._id,
    });
  }, [profile]);
  useEffect(() => {
    getProvinces();
    if (profile?.province?._id) {
      onChangeProvince(profile?.province?._id);
      onChangeDistrict(profile?.district?._id);
      onChangeWard(profile?.ward?._id);
    }
  }, [profile?.province?._id]);
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
    total,
    subTotal,
    form,
  };
};

export default useCheckout;

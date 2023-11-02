import instanceAxios from "@/utils/configAxios";

export const provinceService = {
  getCity: () => {
    return instanceAxios.get(`https://vapi.vnappmob.com/api/province/`);
  },
  getDistrict: (cityId) => {
    return instanceAxios.get(
      `https://vapi.vnappmob.com/api/province/district/${cityId}`
    );
  },
  getWard: (districtId) => {
    return instanceAxios.get(
      `https://vapi.vnappmob.com/api/province/ward/${districtId}`
    );
  },
};

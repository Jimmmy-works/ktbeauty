import instanceAxios from "@/utils/configAxios";

export const provinceService = {
  getCity: () => {
    return instanceAxios.get(`https://cfdshop.cfdcircle.vn/api/v1/provinces`);
  },
  getDistrict: (provinceId) => {
    return instanceAxios.get(
      `https://cfdshop.cfdcircle.vn/api/v1/districts?province=${provinceId}`
    );
  },
  getWard: (districtId) => {
    return instanceAxios.get(
      `https://cfdshop.cfdcircle.vn/api/v1/wards?district=${districtId}`
    );
  },
};
// export const provinceService = {
//   getCity: () => {
//     return instanceAxios.get(`https://vapi.vnappmob.com/api/province/`);
//   },
//   getDistrict: (cityId) => {
//     return instanceAxios.get(
//       `https://vapi.vnappmob.com/api/province/district/${cityId}`
//     );
//   },
//   getWard: (districtId) => {
//     return instanceAxios.get(
//       `https://vapi.vnappmob.com/api/province/ward/${districtId}`
//     );
//   },
// };

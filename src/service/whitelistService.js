import instanceAxios from "@/utils/configAxios";

export const whiteListService = {
  getWhiteList: (token) => {
    return instanceAxios.get(`/api/whileList/get-all-whileList`, {
      headers: { token: `Bearer ${token}` },
    });
  },
  updateWhiteList: (payload, token) => {
    return instanceAxios.put(`/api/whileList/update-whileList`, payload, {
      headers: { token: `Bearer ${token}` },
    });
  },
};

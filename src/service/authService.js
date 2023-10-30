import { BASE_URL } from "@/contants/environment";
import instanceAxios from "@/utils/configAxios";
import axios from "axios";

const authService = {
  signin: (payload = {}) => {
    return instanceAxios.post(`/api/user/sign-in`, payload);
  },
  register: (payload) => {
    return axios.post(`${BASE_URL}/api/user/sign-up`, payload);
  },
  getProfileSlug: (id, token) => {
    return instanceAxios.get(`/api/user/get-detail-user/${id}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  refreshToken: (token) => {
    return axios.post(
      `${BASE_URL}/api/user/refresh-token`,
      {},
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  },

  editProfile: () => {},
};

export default authService;

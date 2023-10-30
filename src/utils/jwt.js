import { decodeToken } from "react-jwt";

export const decodeTokenJWT = (token) => {
  try {
    console.log("token", token);
    return decodeToken(token);
  } catch (error) {
    console.log("error", error);
    return;
  }
};

// decodeAccesstoken
export const decodeAccessToken = async (data) => {
  try {
    await decodeToken(data);
  } catch (error) {
    console.log(error);
    return;
  }
};

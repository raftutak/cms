import axios from "axios";
import { API_URL } from "../constants/api";

export const resetPasswordPageLoader = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    const response = await axios.post(`${API_URL}/resetPassword/verifyToken`, {
      resetPasswordToken: token,
    });

    response.data.token = token;
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

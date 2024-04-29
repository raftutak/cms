import axios from "axios";
import { API_URL } from "../constants/api";
import { AuthService } from "../services/auth.service";

export const profileLoader = () => {
  const { userId } = AuthService.getUser();
  console.log(AuthService.addHeader());

  return axios(`${API_URL}/users/${userId}/getProfile`, {
    headers: AuthService.addHeader(),
  });
};

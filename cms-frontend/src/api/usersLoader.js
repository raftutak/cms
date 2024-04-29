import axios from "axios";
import { API_URL } from "../constants/api";
import { AuthService } from "../services/auth.service";

export const usersLoader = () => {
  console.log(AuthService.addHeader());

  return axios(`${API_URL}/users`, { headers: AuthService.addHeader() });
};

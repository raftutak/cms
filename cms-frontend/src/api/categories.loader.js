import axios from "axios";
import { API_URL } from "../constants/api";
import { AuthService } from "../services/auth.service";

export const categoriesLoader = () => {
  return axios(`${API_URL}/categories`, { headers: AuthService.addHeader() });
};

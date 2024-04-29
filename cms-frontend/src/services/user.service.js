import axios from "axios";
import { authHeader } from "./auth.header";
import { API_URL } from "../constants/api";

const getPublicContent = () => {
  return axios.get(`${API_URL}/posts`);
};

const getAdminContent = () => {
  return axios.get(`${API_URL}/users`, { headers: authHeader() });
};

export const UserService = {
  getPublicContent,
  getAdminContent,
};

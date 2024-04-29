import axios from "axios";
import { API_URL } from "../constants/api";

export const homePageLoader = () => {
  return axios(`${API_URL}/pages/1`);
};

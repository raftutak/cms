import axios from "axios";
import { API_URL } from "../constants/api";

export const pagesLoader = () => {
  return axios(`${API_URL}/pages`);
};

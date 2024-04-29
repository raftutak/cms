import axios from "axios";
import { API_URL } from "../constants/api";

export const layoutLoader = () => {
  return axios(`${API_URL}/site`);
};

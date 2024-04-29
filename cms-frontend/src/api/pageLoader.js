import axios from "axios";
import { API_URL } from "../constants/api";

export const pageLoader = (req) => {
  const { id } = req.params;

  return axios(`${API_URL}/pages/${id}`);
};

import axios from "axios";
import { API_URL } from "../constants/api";

export const searchLoader = (req) => {
  const { query } = req.params;

  return axios(`${API_URL}/search/${query}`);
};

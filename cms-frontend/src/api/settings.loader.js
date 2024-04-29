import axios from "axios";
import { API_URL } from "../constants/api";
import { AuthService } from "../services/auth.service";

export const settingsLoader = async () => {
  const pages = await axios(`${API_URL}/pages`, {
    headers: AuthService.addHeader(),
  });
  const posts = await axios(`${API_URL}/posts`, {
    headers: AuthService.addHeader(),
  });
  const site = await axios(`${API_URL}/site`, {
    headers: AuthService.addHeader(),
  });

  return { pages, posts, site };
};

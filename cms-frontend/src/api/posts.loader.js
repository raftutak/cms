import axios from "axios";
import { API_URL } from "../constants/api";

export const postLoader = async (req) => {
  const { idOrSlug } = req.params;
  const categories = await axios(`${API_URL}/categories`);
  const post = await axios(`${API_URL}/posts/${idOrSlug}`);

  return { post, categories };
};

export const postsLoader = async () => {
  const categories = await axios(`${API_URL}/categories`);
  const posts = await axios(`${API_URL}/posts`);

  return { posts, categories };
};

export const categoryPostsLoader = async (req) => {
  const { categoryId } = req.params;

  const categories = await axios(`${API_URL}/categories`);
  const posts = await axios(`${API_URL}/posts/category/${categoryId}`);

  return { posts, categories };
};

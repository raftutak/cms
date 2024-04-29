import axios from "axios";
import { API_URL } from "../constants/api";
import { jwtDecode } from "jwt-decode";

const addHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    return { "x-access-token": user.token };
  } else {
    return {};
  }
};

const register = (name, email, password, invitationToken, role) => {
  return axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
    invitationToken,
    role,
  });
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const sendResetPassword = (email) => {
  return axios.post(`${API_URL}/resetPassword/send`, {
    email,
  });
};

const resetPassword = (email, password, resetPasswordToken) => {
  return axios.post(`${API_URL}/resetPassword/setPassword`, {
    email,
    password,
    resetPasswordToken,
  });
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const check = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.token) {
    return false;
  }

  try {
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const AuthService = {
  addHeader,
  register,
  login,
  logout,
  sendResetPassword,
  resetPassword,
  getUser,
  check,
};

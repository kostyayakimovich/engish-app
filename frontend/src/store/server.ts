import { AuthorizationActionCreater } from "./models";
import { getCookie } from "react-use-cookie";
export const API_URL = "http://localhost:5000/api";

const loginUrl = `${API_URL}/login`;
const registerUrl = `${API_URL}/registration`;
const logoutUrl = `${API_URL}/logout`;
const refreshUrl = `${API_URL}/refresh`;
const userUrl = `${API_URL}/users`;
const headerConfig = {
 "Content-Type": "application/json",
 "Access-Control-Allow-Origin": "*",
 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

const api = {
 register: async (data: AuthorizationActionCreater) => {
  const response = await fetch(registerUrl, {
   method: "POST",
   body: JSON.stringify(data),
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },
 login: async (data: AuthorizationActionCreater) => {
  const response = await fetch(loginUrl, {
   method: "POST",
   body: JSON.stringify(data),
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },
 logout: async () => {
  const response = await fetch(logoutUrl, {
   method: "POST",
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },

 checkAuth: async () => {
  const response = await fetch(refreshUrl, {
   method: "POST",
   body: JSON.stringify({ refreshToken: `${getCookie("refreshToken")}` }),
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },

 getUsers: async () => {
  const response = await fetch(userUrl, {
   method: "GET",
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },
};
export default api;

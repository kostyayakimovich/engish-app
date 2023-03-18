import { AuthorizationActionCreater } from "./models";
import { getCookie } from "react-use-cookie";
import {
 AddWordActionCreater,
 EditWordActionCreater,
 GetWordsActionCreater,
 RemoveWordActionCreater,
} from "./models/words.model";
export const API_URL = "http://localhost:5000/api";

const loginUrl = `${API_URL}/login`;
const registerUrl = `${API_URL}/registration`;
const logoutUrl = `${API_URL}/logout`;
const refreshUrl = `${API_URL}/refresh`;
const getWordsUrl = `${API_URL}/get-words`;
const addWordUrl = `${API_URL}/add-word`;
const editWordUrl = `${API_URL}/edit-word`;
const removeWordUrl = `${API_URL}/remove-word`;

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

 getWords: async (data: GetWordsActionCreater) => {
  const response = await fetch(getWordsUrl, {
   method: "POST",
   body: JSON.stringify(data),
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },

 addWord: async (data: AddWordActionCreater) => {
  const response = await fetch(addWordUrl, {
   method: "POST",
   body: JSON.stringify(data),
   headers: { ...headerConfig },
  });

  const details = await response.json();
  return details;
 },

 editWord: async (data: EditWordActionCreater) => {
  const response = await fetch(editWordUrl, {
   method: "POST",
   body: JSON.stringify(data),
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },

 removeWord: async (data: RemoveWordActionCreater) => {
  const response = await fetch(removeWordUrl, {
   method: "POST",
   body: JSON.stringify(data),
   headers: { ...headerConfig },
  });
  const details = await response.json();
  return details;
 },
};
export default api;

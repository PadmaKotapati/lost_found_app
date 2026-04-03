import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:9595/lostfound";

// ✅ SAVE
export const saveFoundItem = (foundItem) => {
  return axios.post(`${BASE_URL}/found`, foundItem, {
    withCredentials: true,
  });
};

// ✅ GET ALL
export const getAllFoundItems = () => {
  return axios.get(`${BASE_URL}/found`, {
    withCredentials: true,
  });
};

// ✅ GET BY USER
export const getFoundItemsByUsername = () => {
  const username = localStorage.getItem("username");
  return axios.get(`${BASE_URL}/found-user/${username}`, {
    withCredentials: true,
  });
};

// ✅ GENERATE ID
export const generateFoundItemId = () => {
  return axios.get(`${BASE_URL}/found-id`, {
    withCredentials: true,
  });
};

// ✅ MATCH SEARCH
export const getFoundItemsByLostItem = (id) => {
  return axios.get(`${BASE_URL}/found-id/${id}`, {
    withCredentials: true,
  });
};
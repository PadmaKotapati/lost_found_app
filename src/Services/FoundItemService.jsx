import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:9595/lostfound';
const FOUND_URL = `${BASE_URL}/found`;
const FOUND_ID_URL = `${BASE_URL}/found-id`;
const FOUND_USER_URL = `${BASE_URL}/found-user`;

// ✅ Save a found item
export const saveFoundItem = (foundItem) => {
  return axios.post(FOUND_URL, foundItem);
};

// ✅ Get all found items
export const getAllFoundItems = () => {
  return axios.get(FOUND_URL);
};

// ✅ Get found item by ID
export const getFoundItemById = (foundItemId) => {
  return axios.get(`${FOUND_URL}/${foundItemId}`);
};

// ✅ Update found item
export const updateFoundItem = (foundItem) => {
  return axios.put(FOUND_URL, foundItem);
};

// ✅ Delete found item by ID
export const deleteFoundItemById = (foundItemId) => {
  return axios.delete(`${FOUND_URL}/${foundItemId}`);
};

// ✅ Generate new found item ID
export const generateFoundItemId = () => {
  return axios.get(FOUND_ID_URL);
};

// ✅ Get found items by username
export const getFoundItemsByUsername = () => {
  const username = localStorage.getItem("username");
  return axios.get(`${FOUND_USER_URL}/${username}`);
};

export const getFoundItemsByLostItem = (id) => {
  return axios.get(`${BASE_URL}/match/${id}`);
};

// 🔥🔥🔥 IMPORTANT (THIS WAS MISSING - YOUR ERROR FIX) 🔥🔥🔥

export const saveMatchItem = (data) => {
  return axios.post(`${BASE_URL}/match`, data);
};
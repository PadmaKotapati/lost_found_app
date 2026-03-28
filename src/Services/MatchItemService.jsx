import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

// 🔹 GET MATCHES
export const getFoundItemsByLostItem = (lostItemId) => {
  return axios.get(`${BASE_URL}/match/${lostItemId}`);
};

// 🔹 SAVE MATCH
export const saveMatchItem = (data) => {
  return axios.post(`${BASE_URL}/match`, data);
};

// 🔹 GET REPORT
export const getAllMatches = () => {
  return axios.get(`${BASE_URL}/match/report`);
};
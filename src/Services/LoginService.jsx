import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

// ================= AUTH =================

// LOGIN
export const validateUser = (username, password) => {
  return axios.post(`${BASE_URL}/login`, { username, password }, {
    withCredentials: true
  });
};

// REGISTER
export const registerNewUser = (user) => {
  return axios.post(`${BASE_URL}/register`, user, {
    withCredentials: true
  });
};

// LOGOUT
export const logout = () => {
  return axios.post(`${BASE_URL}/logout`, {}, {
    withCredentials: true
  });
};

// ================= USER =================

// GET USER
export const getUser = () => {
  return axios.get(`${BASE_URL}/me`, {
    withCredentials: true
  });
};

// ✅ ADD THIS (FIX ERROR)
export const getUserDetails = () => {
  return axios.get(`${BASE_URL}/me`, {
    withCredentials: true
  });
};

// ✅ ADD THIS (FIX ERROR)
export const getUserId = () => {
  return axios.get(`${BASE_URL}/me`, {
    withCredentials: true
  });
};

// GET ROLE
export const getRole = () => {
  return axios.get(`${BASE_URL}/role`, {
    withCredentials: true
  });
};

// DELETE USER
export const deleteUser = (username) => {
  return axios.delete(`${BASE_URL}/user/${username}`, {
    withCredentials: true
  });
};

// ================= PROFILE =================

// GET PROFILE
export const getProfile = (username) => {
  return axios.get(`${BASE_URL}/profile/${username}`, {
    withCredentials: true
  });
};

// UPDATE PROFILE
export const updateProfile = (username, data) => {
  return axios.put(`${BASE_URL}/profile/${username}`, data, {
    withCredentials: true
  });
};

// CHANGE PASSWORD
export const changePassword = (username, data) => {
  return axios.put(`${BASE_URL}/profile/change-password/${username}`, data, {
    withCredentials: true
  });
};

// UPLOAD IMAGE
export const uploadProfileImage = (username, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${BASE_URL}/profile/upload/${username}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  });
};
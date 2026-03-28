import axios from 'axios';

const LOGIN_URL = 'http://localhost:9595/lostfound/login';
const REGISTER_URL = 'http://localhost:9595/lostfound/register';
const ROLE_URL = 'http://localhost:9595/lostfound/role';
const USER_URL = "http://localhost:9595/lostfound/me";
const LOGOUT_URL = 'http://localhost:9595/lostfound/logout';
const ME_URL = 'http://localhost:9595/lostfound/me';

// REGISTER USER
export const registerNewUser = (user) => {
    return axios.post(REGISTER_URL, user, {
        withCredentials: true
    });
};

// LOGIN USER
export const validateUser = (username, password) => {

    const user = {
        username: username,
        password: password
    };

    return axios.post(LOGIN_URL, user, {
        withCredentials: true
    });
};

// GET CURRENT USER DETAILS
export const getUserDetails = () => {
    return axios.get(ME_URL, {
        withCredentials: true
    });
};

// DELETE USER
export const deleteUser = (username) => {
    return axios.delete(
        `http://localhost:9595/lostfound/user/${username}`,
        {
            withCredentials: true
        }
    );
};

// GET USER ID
export const getUserId = () => {
    return axios.get(USER_URL, {
        withCredentials: true
    });
};

// GET ROLE
export const getRole = () => {
    return axios.get(ROLE_URL, {
        withCredentials: true
    });
};

// GET CURRENT USER
export const getUser = () => {
    return axios.get(ME_URL, {
        withCredentials: true
    });
};

// LOGOUT
export const logout = () => {
    return axios.post(LOGOUT_URL, {}, {
        withCredentials: true
    });
};
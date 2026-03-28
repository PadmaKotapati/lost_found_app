import axios from 'axios';


axios.defaults.withCredentials = true;

const LOST_URL = 'http://localhost:9595/lostfound/lost';
const ID_URL = 'http://localhost:9595/lostfound/lost-id';
const USR_URL = 'http://localhost:9595/lostfound/lost-user';
const LOGIN_URL = 'http://localhost:9595/lostfound/login';
const ROLE_URL = 'http://localhost:9595/lostfound/role'; 

export const validateUser = (username, password) => {
    const user = {
        username: username,
        password: password
    };

    return axios.post("http://localhost:9595/lostfound/login", user, {
        withCredentials: true
    });
}



export const saveLostItem = (lostItem) => {
    return axios.post(LOST_URL, lostItem, {
        withCredentials: true
    });
}
export const getAllLostItems = () => {
    return axios.get(LOST_URL, {
        withCredentials: true
    });
}



export const getLostItemById = (lostItemId) => {
    return axios.get(`${LOST_URL}/${lostItemId}`, {
        withCredentials: true
    });
}


export const updateLostItem = (lostItem) => {
    return axios.put(LOST_URL, lostItem, {
        withCredentials: true
    });
}



export const deleteLostItemById = (lostItemId) => {
    return axios.delete(`${LOST_URL}/${lostItemId}`, {
        withCredentials: true
    });
}



export const generateLostItemId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}
export const getRole = () => {     // ✅ Added
    return axios.get(ROLE_URL, {
        withCredentials: true
    });
};



export const getLostItemsByUsername = () => {
    const username = localStorage.getItem("username");
    return axios.get(
        `http://localhost:9595/lostfound/lost-user/${username}`,
        { withCredentials: true }
    );
}


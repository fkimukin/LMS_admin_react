import axios from 'axios';

const url = "http://localhost:8090";

const loginApi = async (email, password) => {
  return await axios.post(`${url}/login`, { email, password });
};

export { loginApi };

const authHeader = () => {
    const token = localStorage.getItem('token');

    let header = {};
    if (token) {
        header = { Authorization: `Bearer ${token}` };
    }
    
return header;
};

const registerUserApi = async (values) => {
  return await axios.post(`${url}/register`, values, {headers: authHeader()});
};

export { registerUserApi };



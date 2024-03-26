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

const getUsersByPage = async (
  page,
  rowsPerPage,
  sort = "userId",
  direction = "DESC"
) => {
  const response = await axios.get(`${url + "/user"}/auth/pages?page=${page}&size=${rowsPerPage}&sort=${sort}&direction=${direction}`, 
  {
      headers: authHeader()
  });
  
return response.data;
};

export { getUsersByPage };



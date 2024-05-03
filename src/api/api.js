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

const updateUserAdmin = async (selectedUserId, submitValues) => {
  const response = await axios.put(`${url + "/user"}/${selectedUserId}/auth`, submitValues, {
      headers: authHeader()
  });

  return response.data;
};

export { updateUserAdmin };


const deleteUserApi = async (userId) => {
  const response = await axios.delete(`${url + "/user"}/${userId}/auth`, {
    headers: authHeader()
  });

return response.data;
}

export { deleteUserApi };

const getCurrentUser = async () => {
  const response = await axios.get(`${url + "/user"}`, {
      headers: authHeader()
  });

  return response.data;
};

export { getCurrentUser };

const updateUser = async (submitValues) => {
  const response = await axios.put(`${url + "/user"}/user-update`, submitValues, {
      headers: authHeader()
  });

  return response.data;
};

export { updateUser };

const updateUserPassword = async (submitValues) => {
  const response = await axios.patch(`${url + "/user"}/auth`, submitValues, {
      headers: authHeader()
  });

  return response.data;
};

export { updateUserPassword };

// --------------------------- Teacher ---------------------------

const registerTeacherApi = async (values) => {
  return await axios.post(`${url}/teacher-register`, values, {headers: authHeader()});
};

export { registerTeacherApi };


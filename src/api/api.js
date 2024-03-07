import axios from 'axios';

const url= "http://localhost:8090";

const loginApi = async (email, password) => {

return await axios.post(`${url}/login`,{email, password})
    
};

export default loginApi;

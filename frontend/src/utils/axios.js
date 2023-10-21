import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
// import { clearStore } from '../features/userSlice';


const customFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
  });
  
  customFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  });
  

  
  export default customFetch;
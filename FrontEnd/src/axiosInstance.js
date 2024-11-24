import axios from 'axios'; 
 
const REACT_APP_BACKEND_URL = "http://localhost:3000";
const token = localStorage.getItem("Token");  ;
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Transform the response data to include `success` directly
    const { success, data } = response.data;
    response.success = success;
    response.data = data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

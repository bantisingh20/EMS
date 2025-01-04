// import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom';
 
// const REACT_APP_BACKEND_URL = "http://localhost:3000/api";
// const token = localStorage.getItem("Token");
// // Create Axios instance



// const axiosInstance = axios.create({
//   baseURL: REACT_APP_BACKEND_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     "Authorization": `Bearer ${token}`,
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Transform the response data to include `success` directly
//     const { success, data } = response.data;
//     response.success = success;
//     response.data = data;
//     return response;
//   },
//   (error) => {
//     const navigate = useNavigate(); // Hook is only usable in a component, see Alternative Below
//     if (error.response?.status === 401) {
//       // Handle token expiration or invalid token
//       console.error('Unauthorized or token expired. Redirecting to login...');
//       localStorage.removeItem("Token"); // Clear invalid token
//       navigate('/login'); // Redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';

const REACT_APP_BACKEND_URL = "http://localhost:3000/api";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to dynamically fetch the latest token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token"); // Always fetch the latest token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    else{
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Transform the response data to include `success` directly
    const { success, data } = response.data;
    response.success = success;
    response.data = data;
    return response;
  },
  (error) => {
    // Redirect to login on 401 errors
    if (error.response?.status === 401) {
     // const navigate = useNavigate(); // This is a hook and cannot be used here
      console.error('Unauthorized or token expired. Redirecting to login...');
      localStorage.removeItem("Token"); // Clear invalid token
      window.location.href = '/login'; // Use this instead of navigate()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

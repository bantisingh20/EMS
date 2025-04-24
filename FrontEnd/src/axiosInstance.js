import axios from 'axios';

const REACT_APP_BACKEND_URL = "http://localhost:3000/api";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to dynamically fetch the latest token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token"); // Always fetch the latest token
    const userid = localStorage.getItem("userid");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.UserId = `${userid}`;
    }
    else{
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.UserId = `${userid}`;
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
    console.log(response);
    const { success, data ,token ,user,message } = response.data;
    response.success = success;
    response.data = data;
    response.token = token; 
    response.user= user;
    response.message = message;
    return response;
  },
  (error) => { 
        console.log(error);
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

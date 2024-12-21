import axios from 'axios';
import {useLocation} from 'react-router-dom';
import axiosInstance from '../axiosInstance';

// 
export const saveLeaveRequest = async (leaveData) => {
  try {
       
    // const location = useLocation();
    // const baseUrl =  location.pathname.replace('/dashboard', '');

    const response = await axiosInstance.post('/leave/apply-leave', leaveData);
    return response.data; // Return response if needed

  } catch (error) {
    console.error('Error saving leave request:', error);
    throw error; // Throw error to be caught in the page component
  }
};

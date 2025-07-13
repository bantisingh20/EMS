import {useLocation} from 'react-router-dom';
import axiosInstance from '../axiosInstance';
// import { useLocationContext } from '../Context/LocationContext';


const saveLeaveRequest = async (leaveData) => {
  try {
    const response = await axiosInstance.post('/leave/apply-leave', leaveData);

    console.log(response);
    return response; // Return response if needed

  } catch (error) {
    console.error('Error saving leave request:', error.response.data);
    throw error.response.data.message; // Throw error to be caught in the page component
  }
};

const GetUserWiseLeaveData = async(location) =>{
  try { 
    //const baseUrl =  location.pathname.replace('/Get-all-leave-details', '');
    const response = await axiosInstance.get('/leave/Get-all-leave-details');
    return response;
    
  } catch (error) {
    console.error('Error Getting leave request:', error);
    throw error; // Throw error to be caught in the page component
  }
}

export {saveLeaveRequest,GetUserWiseLeaveData}
import {useLocation} from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { handleSuccess ,handleError } from '../Pages/Common';


const UserPunchIn = async (now) => {
  try {
    const response = await axiosInstance.post('/attendence/punch-in', { CheckinDate: now });
    if (response.data.success) {
      console.log(response.data);
      handleSuccess(response.data.message);
    } else {
      console.log('ete')
      handleError(response.data.message);
    }
    return response; 

  } catch (error) {
  
    console.error('Error saving leave request:', error.response);
    throw error.response;  
  }
};

const UserPunchOut = async (currentTime,punchInTime) => {
    try {
       
      const diff = calculateTimeDifference(punchInTime,currentTime);
      const response = await axiosInstance.post('/attendence/punch-out',{
        currentTime,punchInTime,diff
      });
  
      console.log(response);
      return response; // Return response if needed
  
    } catch (error) {
      console.error('Error While Punch out:', error.response);
      throw error.response.data.message; // Throw error to be caught in the page component
    }
};

const GetEmployeePuchDetails = async() =>{
  try {
    
    const response = await axiosInstance.get('/attendence/attendance-details');
     
    return response.data;
    
  } catch (error) {
    console.error('Error Getting Attendence request:', error.response.data);
    throw error.response.data.message;
  }
}

const calculateTimeDifference = (punchInTime,currentTime) => {
  if (punchInTime) {
    const diff = Math.floor((currentTime - punchInTime) / 60000); // Time difference in minutes
    return diff < 0 ? 0 : diff; 
  }
  return 0;
};

 // Calculate percentage for the circular progress
 const calculateCircularProgressValue = (punchInTime,currentTime) => {
  const maxTime = 480; // Let's assume 8 hours max work time (in minutes)
  const timeDiff = calculateTimeDifference(punchInTime,currentTime);
  const progress = (timeDiff / maxTime) * 100; // Percentage progress
  return progress > 100 ? 100 : progress;
};

const calculateHRSTimeDifference = (punchInTime, currentTime) => {
  if (punchInTime) {
    const diffInMinutes = Math.floor((currentTime - punchInTime) / 60000); // Time difference in minutes
    if (diffInMinutes < 60) {
      
      return diffInMinutes < 0 ? '0 min' : `${diffInMinutes} min`;
      //return `${diffInMinutes} min`;
    } else {
  
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `${hours}.${minutes < 10 ? '0' + minutes : minutes} hrs`;
    }
  }
  return "0 min"; // Default return if no punch-in time
};

export {UserPunchIn ,UserPunchOut ,GetEmployeePuchDetails ,calculateTimeDifference,calculateCircularProgressValue,calculateHRSTimeDifference}
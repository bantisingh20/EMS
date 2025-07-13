//import axiosInstance from '../axiosInstance';

import axiosInstance from '../axiosInstance';

export const GetAllMenulist = async () => {
    try {
      const data = await axiosInstance.get('menu/get-menu');       
      return data
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
};

export const GetRoleWiseMenu = async () => {
    try {
      const data = await axiosInstance.get('menu/get-menu');       
      return data
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
};
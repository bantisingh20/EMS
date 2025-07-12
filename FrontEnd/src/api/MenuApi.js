//import axiosInstance from '../axiosInstance';

import axios from "axios";

const GetAllMenulist = async () => {
    try {
      const data = await axios.get('menu/get-menu');       
      return data
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
};

export {GetAllMenulist}

//const SaveMenu
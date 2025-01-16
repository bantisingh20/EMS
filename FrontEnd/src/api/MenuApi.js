import axiosInstance from "../axiosInstance";

const GetAllMenulist = async () => {
    try {
      const data = await axiosInstance.get('menu/get-menu');       
      return data
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
};

export {GetAllMenulist}

//const SaveMenu
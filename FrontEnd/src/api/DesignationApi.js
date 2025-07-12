import axiosInstance from "../axiosInstance";
import { useParams } from 'react-router-dom';

const SaveNewDesignation = async(SubmitDesignationData) => {
    try {
         
        const response = await axiosInstance.post(`/designation/save-designation`,SubmitDesignationData);

        return response;  
    } catch (error) {
        console.error("Error fetching designation:", error);
        throw error;
    }
}

const Updatedesignation = async(SubmitDesignationData) => {
    try {
         console.log(SubmitDesignationData);
        const response = await axiosInstance.put(`/designation/Updatedesignation`,SubmitDesignationData);

        return response;  
    } catch (error) {
        console.error("Error While update departments:", error);
        throw error;
    }
}

const GetAllDesignationsNew = async() => {
    try {
        const response = await axiosInstance.get(`/designation/GetAllDesignation`);
         
        return response;  
    } catch (error) {
        console.error("Error fetching Designation:", error);
        throw error; 
    }
}

const GetDesignationById = async(id) => {
    try {                
        const response = await axiosInstance.get(`/designation/GetDesignationById/${id}`);
        
        return response.data;  
    } catch (error) {
        console.error("Error fetching Designation:", error);
        throw error;
    }
}

const DeleteDesignationById = async(_id) => {
    const userConfirmed = await confirm("Are you sure ?");
    if(userConfirmed){
        try{
            console.log(_id);
            const response = await axiosInstance.delete(`/designation/deleteDesignationByID/${_id}`);

            return response;
        }
        catch(error){
            throw error.response.data;
        }
    }
    
}

export {SaveNewDesignation,GetAllDesignationsNew,DeleteDesignationById,Updatedesignation,GetDesignationById}

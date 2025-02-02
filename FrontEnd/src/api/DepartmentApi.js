import axiosInstance from "../axiosInstance";
import { useParams } from 'react-router-dom';

const SaveNewDepartment = async(SubmitDepartmentData) => {
    try {
         
        const response = await axiosInstance.post(`/department/save-department`,SubmitDepartmentData);

        return response;  
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
}

const UpdateDepartment = async(SubmitDepartmentData) => {
    try {
         
        const response = await axiosInstance.put(`/department/UpdateDepartment`,SubmitDepartmentData);

        return response;  
    } catch (error) {
        console.error("Error While update departments:", error);
        throw error;
    }
}

const GetAllDepartmentsNew = async() => {
    try {
        const response = await axiosInstance.get(`/department/GetAllDepartment`);
         
        return response;  
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error; 
    }
}

const GetDepartmentById = async(id) => {
    try {                
        const response = await axiosInstance.get(`/department/GetDepartmentById/${id}`);
        
        return response.data;  
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
}

const DeleteDepartmentById = async(_id) => {
    const userConfirmed = await confirm("Are you sure ?");
    if(userConfirmed){
        try{
            console.log(_id);
            const response = await axiosInstance.delete(`/department/deleteDepartmentByID/${_id}`);

            return response;
        }
        catch(error){
            throw error.response.data;
        }
    }
    
}

export {SaveNewDepartment,GetAllDepartmentsNew,DeleteDepartmentById,UpdateDepartment,GetDepartmentById}

import axiosInstance from "../axiosInstance";
import { useParams } from 'react-router-dom';

const SaveUpdateEmployee = async(data) =>{
    try {
        const response = await axiosInstance.post('/employees/save-employees',data);
        return response;
    } catch (error) {
        console.error("Error While Saving:", error);
        throw error; 
    }
}

const UpdateEmployee = async(data) => {
    try {
        // console.log(data);
        const response = await axiosInstance.put(`/employees/UpdateEmployee`,data);

        return response;  
    } catch (error) {
        console.error("Error While update employees:", error);
        throw error;
    }
}

const GetAllEmployee = async() =>{
    try {
        const response = await axiosInstance.get('/employees/get-employees');
        return response;
    } catch (error) {
        console.error("Error While Fetching:", error);
        throw error;
    }
}

const GetEmployeeById = async(id) =>{
    try {
        const response = await axiosInstance.get(`/employees/GetEmployeesById/${id}`);
        console.log("Response from GetEmployeeById:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error While Fetching:", error);
        throw error;
    }
}

const DeleteEmployeeById = async() =>{
    try {
        
    } catch (error) {
        console.error("Error While Deleting:", error);
        throw error;
    }
}

export {SaveUpdateEmployee, GetAllEmployee, GetEmployeeById, DeleteEmployeeById , UpdateEmployee}
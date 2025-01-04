import axios from 'axios';
import {config ,Token } from '../../config';
import axiosInstance from '../axiosInstance';


export class DepartmentsClass {
     
    
    constructor( _id='0',departmentid=0, departmentname='', mode='new', disabled='n', statusdate=Date.Now) {
        this.departments = {
          departmentid,
          departmentname,
          mode,
          disabled,
          statusdate,
        };
    }


    handleInputChange(name, value) {
        this.departments[name] = value; 
        console.log(this.departments);  
    }


    getDepartmentInfo() {
        return this.departments;
    }

    async GetAllDepartmentsNew() {
        try {
            const response = await axiosInstance.get(`/department/GetAllDepartment`);
            //console.log(response.data)
             
            return response;  
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error; 
        }
    }


    async SaveNewDepartment(SubmitDepartmentData) {
        try {
             
            const response = await axios.post(`${config}/api/department/save-department`,SubmitDepartmentData,{
                headers: {
                  "Authorization":`Bearer ${Token}`
                }
            });

            return response.data;  
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error.response.data;
        }
    }


    async UpdateDepartment(SubmitDepartmentData) {
        try {
             
            const response = await axios.post(`${config}/api/department/UpdateDepartment`,SubmitDepartmentData,{
                headers: {
                  "Authorization":`Bearer ${Token}`
                }
            });

            return response.data;  
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error.response.data;
        }
    }
    
    async DeleteDepartmentById(_id) {
        const userConfirmed = await confirm("Are you sure ?");
        if(userConfirmed){
            try{
                console.log(_id);
                const response = await axios.delete(`${config}/api/department/deleteDepartmentByID/${_id}`,{
                    headers: {
                        "Authorization":`Bearer ${Token}`
                      }
                });
    
                return response.data;
            }
            catch(error){
                throw error.response.data;
            }
        }
        
    }
}

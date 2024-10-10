import axios from 'axios';
import {config ,Token } from '../../config';


export class DesignationClass {
     
    
    constructor(designationid, designationname) {
        this.designation = {
            designationid,
            designationname     
        };
    }
 
    handleInputChange(name, value) {
        this.designation[name] = value; 
        console.log(this.designation);  
    }


    getInfo() {
        return this.designation;
    }

    async GetAllDesignations() {
        try {
            const response = await axios.get(`${config}/api/designation/GetAlldesignation`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            //console.log(response.data)
             
            return response.data;  
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error; 
        }
    }


    async SaveNewDesignation() {
        try {
             
            const response = await axios.post(`${config}/api/designation/save-designation`,this.designation,{
                headers: {
                  "Authorization":`Bearer ${Token}`
                }
            });

            return response.data;  
        } catch (error) {
            console.error("Error fetching designation:", error);
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

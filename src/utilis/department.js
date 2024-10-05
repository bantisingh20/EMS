import axios from 'axios';
import {config ,Token } from '../../config';


export class DepartmentsClass {
    
    constructor(departmentid=0, departmentname='', mode='new', disabled='n', statusdate=Date.Now) {
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
            const response = await axios.get(`${config}/api/department/GetAllDepartment`, {
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


    async SaveNewDepartment() {
        try {
            console.log(this.departments);
            const response = await axios.post(`${config}/api/department/save-department`,this.departments,{
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

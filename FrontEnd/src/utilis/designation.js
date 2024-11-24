import axios from 'axios';
import {config ,Token } from '../../config';


export class DesignationClass {
     
    
    constructor(_id=0, designationname='') {
        this.designation = {
            _id,
            designationname     
        };
    }
 
    setDesignation(newobject) {
        this.designation =newobject;
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

            let apivalue;
            if(this.designation._id == 0){
                apivalue="save-designation"
            }
            else{
                apivalue="Update-designation"
            }
            const response = await axios.post(`${config}/api/designation/${apivalue}`,this.designation,{
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


    async UpdateDesignation() {
        try {
             
            const response = await axios.post(`${config}/api/designation/Update-designation`,this.designation,{
                headers: {
                  "Authorization":`Bearer ${Token}`
                }
            });

            return response.data;  
        } catch (error) {
            console.error("Error Update designation:", error);
            throw error.response.data;
        }
    }
    
    async DeleteDesignationById(_id) {
        const userConfirmed = await confirm("Are you sure ?");
        if(userConfirmed){
            try{
                console.log(_id);
                const response = await axios.delete(`${config}/api/designation/DeletedesignationByID/${_id}`,{
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

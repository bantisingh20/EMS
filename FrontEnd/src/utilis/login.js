import axios from 'axios';
import {config ,Token } from '../../config';


export class loginClass {
    
    constructor( loginName='', password='') {
        this.logindata = {
            loginName,
            password,          
        };
    }


    handleInputChange(name, value) {
        this.logindata[name] = value; 
        console.log(this.logindata);  
    }


    getloginInfo() {
        return this.logindata;
    }

    async logOut() {
        await setUser({});
        await localStorage.removeItem("Token");
        await localStorage.removeItem("session");
        await navigate('/login');
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

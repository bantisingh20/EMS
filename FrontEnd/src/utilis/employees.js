import axios from 'axios'; 
import {config ,Token } from '../../config';
import axiosInstance from '../axiosInstance';
import * as yup from 'yup'; 
export class EmployeeClass {
   
    constructor(
        employeeid =0
        ,employeecode= ''
        ,firstname='' 
        ,lastname=''
        ,contactno=0
        ,emailid='' 
        ,gender =''
        ,dateofbith = new Date()
        ,maritialstatus=''
        ,role =''
        ,department=''
        ,designation =''
        ,dateofJoining = new Date()
        ,address =''
        ,employeetype='' 
        ,activestatus =''
        ,isdeleted ='' 
        ,password =''
    ) {
        this.employees = {
            employeeid ,
            employeecode ,
            firstname ,
            lastname ,
            contactno ,
            emailid,
            gender ,
            dateofbith ,
            maritialstatus ,
            role ,
            department ,
            designation ,
            dateofJoining ,
            address ,
            employeetype ,
            activestatus ,
            isdeleted ,
            password,
        };
    }
 
    
    validationSchema = yup.object().shape({
        _id:yup.string(),
        Userid:yup.string(),
        employeecode: yup.string().required('Employee Code is required'),
        firstname: yup.string().required('First Name is required'),
        lastname: yup.string().required('Last Name is required'),
        contactno: yup.string().matches(/^[0-9]{10}$/, 'Contact Number must be 10 digits').required('Contact Number is required'),
        emailid: yup.string().email('Invalid email format').required('Email ID is required'),
        gender: yup.string().required('Gender is required'),
        department: yup.string().required('Department is required'),
        role: yup.string().required('Role is required'),
        designation: yup.string().required('Designation is required'),
        dateofJoining: yup.date().required('Date of Joining is required'),
        address: yup.string().required('Address is required'),
        password: yup.string().required('Password is required'),
        salary: yup.string()
      });

    handleInputChange(name, value) { 
         this.employees[name] = value; 
        // console.log(this.employees);   
    }

    genderOptions = [
        { key: 'male', name: 'Male' },
        { key: 'female', name: 'Female' },
    ];

    roleOptions = [
        { key: 'user', name: 'user' },
        { key: 'Admin', name: 'Admin' },
        { key: 'Managers', name: 'Manager' },
        { key: 'HR', name: 'HR' },
    ];
 
    
    getEmployeeInfo() {
        return this.employees;
    }


    async SaveEmployee(data){ 
        debugger;
        try{
            const response = await axios.post(`${config}/api/employee/save-employee`,data,{
                headers:{
                    "Authorization": `Bearer ${Token}`
                }
            })
            
            return response.data;
        }
        catch(error){
            console.error("Error Saving Employee:", error);
            throw error.response.data;
        }
    }


    async UpdateEmployees(data){
        try{
            const response = await axios.put(`${config}/api/employee/UpdateEmployee/${data._id}`,data,{
                headers:{
                    "Authorization":`Bearer ${Token}`
                }
            })

            return response.data;
        }
        catch(error){
            throw error.message.data;
        }
    }

    async DisableEmployee(){

    }

    async DeleteEmployee(_id){
        const userConfirmed = await confirm("Are you sure ?");
        if(userConfirmed){
            try{
                console.log(_id);
                const response = await axios.delete(`${config}/api/employee/DeleteEmployee/${_id}`,{
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

    async GetAllEmployees(){
            try {
               const response = await axiosInstance.get(`/employee/GetAllEmployees`);
               return response;
            } catch (error) {
                console.error("Error fetching:", error);
                throw error; 
            }
    }


    async GetEmployeeById(employeeId) {
        try {
            debugger;
            const response = await axios.get(`${config}/api/employee/GetEmployeesById/${employeeId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
    
            console.log(response.data);

            if(response.data.success){
                return response.data.data;
            }
            return response.data; // Assuming the API returns the employee details as the response
        } catch (error) {
            console.error("Error fetching employee data by ID:", error);
            throw error; // Propagate the error for further handling
        }
    }

    
}
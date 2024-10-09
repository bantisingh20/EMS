import axios from 'axios';
import {config ,Token } from '../../config';

export class EmployeeClass {
   
    constructor(
        employeeid =0
        ,employeecode= '1'
        ,firstname='2' 
        ,lastname='3'
        ,contactno=0
        ,emailid='' 
        ,gender =''
        ,dateofbith = new Date()
        ,maritialstatus=''
        ,department=''
        ,designation =''
        ,dateofJoining = new Date()
        ,address =''
        ,employeetype='' 
        ,activestatus =''
        ,recordstatus =''
        ,statusdate  = new Date()
        ,disabled =''
        ,isdeleted =''
        ,isUser=''
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
            department ,
            designation ,
            dateofJoining ,
            address ,
            employeetype ,
            activestatus ,
            recordstatus ,
            statusdate ,
            disabled ,
            isdeleted ,
            isUser ,
            password,
        };
    }

    // constructornew(
    //     employeeid = { value: 0, error: '' },
    //     employeecode = { value: '', error: '' },
    //     firstname = { value: '', error: '' },
    //     lastname = { value: '', error: '' },
    //     contactno = { value: 0, error: '' },
    //     emailid = { value: '', error: '' },
    //     gender = { value: '', error: '' },
    //     dateofbith = { value: new Date(), error: '' },
    //     maritialstatus = { value: '', error: '' },
    //     department = { value: '', error: '' },
    //     designation = { value: '', error: '' },
    //     dateofJoining = { value: new Date(), error: '' },
    //     address = { value: '', error: '' },
    //     employeetype = { value: '', error: '' },
    //     activestatus = { value: '', error: '' },
    //     recordstatus = { value: '', error: '' },
    //     statusdate = { value: new Date(), error: '' },
    //     disabled = { value: '', error: '' },
    //     isdeleted = { value: '', error: '' },
    //     isUser = { value: '', error: '' },
    //     password = { value: '', error: '' }
    // ) {
    //     this.employees = {
    //         employeeid,
    //         employeecode,
    //         firstname,
    //         lastname,
    //         contactno,
    //         emailid,
    //         gender,
    //         dateofbith,
    //         maritialstatus,
    //         department,
    //         designation,
    //         dateofJoining,
    //         address,
    //         employeetype,
    //         activestatus,
    //         recordstatus,
    //         statusdate,
    //         disabled,
    //         isdeleted,
    //         isUser,
    //         password,
    //     };
    // }
    

    
    handleInputChange(name, value) { 
         this.employees[name] = value; 
         console.log(this.employees);   
    }

    genderOptions = [
        { key: 'g', name: 'Male' },
        { key: 'w', name: 'Female' },
    ];

    departmentOptions = [
        { key: '1', name: 'Male' },
        { key: '3', name: 'Female' },
    ];

    validateInput = (name, value) => {
          console.log(name);
        switch (name) {
            case 'employeecode':
                return value.trim() !== '' || 'Employee Code is required.';
            case 'firstname':
                return value.trim() !== '' || 'First Name is required.';
            case 'lastname':
                return value.trim() !== '' || 'Last Name is required.';
            case 'contactno':
                return /^\d{10}$/.test(value) || 'Contact No must be 10 digits.';
            case 'emailid':
                return /\S+@\S+\.\S+/.test(value) || 'Email is invalid.';
            case 'dateofbith':
                return value !== '' || 'Date of Birth is required.';
            case 'maritialstatus':
                return value.trim() !== '' || 'Marital Status is required.';
            case 'department':
                return value.trim() !== '' || 'Department is required.';
            case 'designation':
                return value.trim() !== '' || 'Designation is required.';
            case 'address':
                return value.trim() !== '' || 'Address is required.';
            case 'password':
                return value.length >= 6 || 'Password must be at least 6 characters long.';
            // Add more cases as necessary
            default:
                return true; // No validation needed
        }
    };
    
    getDepartmentInfo() {
        return this.employees;
    }


    async SaveEmployee(){ 
        debugger;
        try{
            const response = await axios.post(`${config}/api/employee/save-employee`,this.employees,{
                headers:{
                    "Authorization": `Bearer ${Token}`
                }
            })
            console.log(response.data);
        }
        catch(error){
            console.error("Error Saving Employee:", error);
            throw error.response.data;
        }
    }


    async UpdateEmployees(){

    }

    async DisableEmployee(){

    }

    async DeleteEmployee(){

    }

    async GetAllEmployees(){

    }
}
import React,{useEffect, useState} from 'react';
import { FormControl, FormLabels, handleError, handleSuccess ,TextFields,BasicSelectTag} from '../Pages/Common';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate ,Navigate, useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; 
import DataTable from 'react-data-table-component';
import { CustomLoader } from '../Pages/loader'
import { EmployeeClass } from '../utilis/employees'; 
import { Select, Option } from "@material-tailwind/react";
 

 
//grid grid-cols-1 md:grid-cols-2 gap-4
const EmployeesPage = () => { 
  const employee = new EmployeeClass();
  const [showModal, setShowModal] = React.useState(true);
  const [mode,setMode]= useState("new")
  const [employeeSubmitDetails,setEmployees] = useState(employee.employees);
  
   
  return (
    <div>  
    
    {showModal ? (
        <>
         
           <div className='max-w-6xl max-auto mt-10 bg-white p-9 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mv-6'>Add New Employee</h2>
            <br />
            <form onSubmit={employee.SaveEmployee()}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
               <div className='flex flex-row'>               
                <TextFields 
                    label="Employee Code"
                    type="text"
                    name="employeecode"
                    value={employeeSubmitDetails.employeecode.value}
                    onChange={(e) => employee.handleInputChange(e.target.name, e.target.value)} 
                    className={undefined}
                    required={undefined} 
                    placeholder={undefined}                  
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
                
               </div>
                
               <div>
               <TextFields 
                  label="First Name" 
                  type="text" 
                  name="firstname" 
                  value={employeeSubmitDetails.firstname.value} 
                  onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                  className={undefined}
                  required={undefined} 
                  placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>


               <div>
               <TextFields 
                  label="Last Name" 
                  type="text" 
                  name="lastname" 
                  value={employeeSubmitDetails.lastname.value}
                  onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                  className={undefined}
                    required={undefined} 
                    placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>


               <div>
               <TextFields 
                  label="Contact" 
                  type="text" 
                  name="contactno" 
                  value={employeeSubmitDetails.contactno.value}
                 onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                 className={undefined}
                    required={undefined} 
                    placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>
                

               <div>
               <TextFields 
                  label="Email" 
                  type="email" 
                  name="emailid" 
                  value={employeeSubmitDetails.emailid.value} 
                 onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                 className={undefined}
                    required={undefined} 
                    placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>

               <div>
               <TextFields 
                  label="Date of Bith" 
                  type="date" 
                  name="dateofbith" 
                  value={employeeSubmitDetails.dateofbith.value} 
                 onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                 className={undefined}
                    required={undefined} 
                    placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>


               <div>
               <TextFields 
                  label="Date of Joining" 
                  type="date" 
                  name="dateofJoining" 
                  value={employeeSubmitDetails.dateofJoining.value}
                 onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                 className={undefined}
                    required={undefined} 
                    placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>


               <div>
                <BasicSelectTag label="Gender" name="gender"
                  value={employeeSubmitDetails.gender.value}
                  onChange={(e) => employee.handleInputChange(["gender"],e)} 
                  Data={employee.genderOptions} 
                />
               </div>


               <div>
               <BasicSelectTag 
                  label="Maritial Status"
                  name="maritialstatus"
                  value={employeeSubmitDetails.maritialstatus.value}
                  onChange={(e) => employee.handleInputChange(["maritialstatus"],e)} 
                  Data={employee.departmentOptions} 
                /> 
               </div>

               <div>
                <BasicSelectTag 
                label="Department" 
                name="department"
                value={employeeSubmitDetails.department.value}
                onChange={(e) => employee.handleInputChange(["department"],e)} 
                Data={employee.departmentOptions}
                // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>


               <div>
                <BasicSelectTag 
                  label="Designation"
                  name="designation"
                  value={employeeSubmitDetails.designation.value}
                  onChange={(e) => employee.handleInputChange(["designation"],e)}  
                  Data={employee.departmentOptions}
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                /> 
               </div>


               <div>
                <BasicSelectTag 
                  label="Employee Type" 
                  name="employeetype"
                  value={employeeSubmitDetails.employeetype.value}
                  onChange={(e) => employee.handleInputChange(["employeetype"],e)} 
                 Data={employee.departmentOptions}
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                 />
               </div>

               <div>
               <BasicSelectTag 
                label="Employee Status" 
                name="activestatus"
                value={employeeSubmitDetails.activestatus.value}
                onChange={(e) => employee.handleInputChange(["activestatus"],e)} 
                Data={employee.departmentOptions}
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>


               <div>
               <TextFields 
                  label="Address" 
                  type="text" 
                  name="address" 
                  value={employeeSubmitDetails.address.value}
                  onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                  className={undefined}
                  required={undefined} 
                  placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>

               <div>
               <TextFields 
                  label="Password" 
                  type="password" 
                  name="password" 
                  value={employeeSubmitDetails.password.value}
                  onChange={(e) => employee.handleInputChange(e.target.name,e.target.value)} 
                  className={undefined}
                  required={undefined} 
                  placeholder={undefined} 
                  // onChange={(e) => ({...employeeSubmitDetails ,e.target.name:e.target.value})}
                />
               </div>
              </div>

              <Button type="submit" className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                onClick={(e) => ([e.preventDefault()])}      >
                           Save
                      </Button>
            </form>
           </div>
          
          <ToastContainer />
        </>
      ) : 
      
      <>
 
        <div className='text-center'>
          <h3 className='text-2xl font-bold mb-6'>Manage Employees</h3>
        </div>

        <div className='flex justify-between items-center px-3'>
          <input 
            type="text" 
            placeholder='Search Employee' 
            className='form-control px-4 py-0.5' 
             
          />
          <Link to={''} className='px-4 py-1 bg-teal-400 rounded text-white' onClick={() => setShowModal(true)} >
            Add New Employee
          </Link>
        </div>
          <ToastContainer />
          <br />
          
         

      </>

      }
      
    </div>
  );
};
 

export default EmployeesPage;
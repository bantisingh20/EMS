import React,{useEffect, useState ,useRef} from 'react';
import { FormControl, FormLabels, handleError, handleSuccess ,TextFields,BasicSelectTag ,BasicSearchInput} from '../Common';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate ,Navigate, useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; 
import DataTable from 'react-data-table-component';
import { CustomLoader } from '../loader'
import { EmployeeClass } from '../../utilis/employees'; 
import {  TextField, Box, MenuItem, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'; 
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup';   
import { DepartmentsClass } from '../../utilis/department';
import { DesignationClass } from '../../utilis/designation';

const SaveEmployee = () => { 
  const obj = new EmployeeClass();
  const objdept = new DepartmentsClass();
  const objdesig = new DesignationClass();

  const formRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("new");

  const [list, setEmployeelist] = useState([]);
  const [pending, setPending] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dept,setDepartment] = useState([]);
  const [deisng,setDesignation] = useState([]);


  const { control, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: yupResolver(obj.validationSchema), 
    defaultValues: {
      employeecode: '',
      firstname: '',
      lastname: '',
      contactno: '',
      emailid: '',
      gender: '',
      department: '',
      role: '',
      designation: '',
      dateofJoining: new Date(),
      address: '',
      password: ''
    }
  });

  
  const ResetForm = () =>{

    setMode("new");
    reset({
      _id: '',
      employeecode: '',
      firstname: '',
      lastname: '',
      contactno: '',
      emailid: '',
      gender: '',
      department: '',
      role: '',
      designation: '',
      dateofJoining: new Date(),
      address: '',
      password: '',
    }); 
  }

  
    const handleShowModal = async (id,edit) =>{
      debugger;
        setShowModal(true);
        setMode("edit")

    
          const editData = await obj.GetEmployeeById(id);
          reset({
            _id:editData._id || 0,
            Userid:editData.Userid || 0,
           // Userid : editData.Userid._id | 0,
            employeecode: editData.employeecode || '',
            firstname: editData.firstname || '',
            lastname: editData.lastname || '',
            contactno: editData.contactno || '',
            emailid: editData.emailid || '',
            gender: editData.gender || '',
            department: editData.department || '',
            role: editData.role || '',
            designation: editData.designation || '',
            dateofJoining: editData.dateofJoining || new Date(),
            address: editData.address || '',
            password: editData.password || ''
          }); 
        
        //if(mode == "edit"){
         
       // }
             
    }


   const handleSubmitForm = async (data) =>{
    try {
 
      let response;
      if(mode=="edit"){
         response = await obj.UpdateEmployees(data);
      }
      else{
         response = await obj.SaveEmployee(data);
      }
      
       
      if(response.success){       
        await setShowModal(false); 
        await handleSuccess('Employee Save Successfully');
        await setMode('new');
        await GetAllEmployee(); 
        ResetForm();    
      }
      else{
        handleError(response.message);
      }
 
      
    } catch (error) {  
       handleError(error.message);
    }

  };

  const columns  = [
     
    { name:"Sr.No", sortable: true, selector:(row) => row.sno },
    { name:"Employee Name", sortable: true, selector:(row) => row.firstname   },
    { name:"Employee Code",  sortable: true,  selector:(row) => row.employeecode },
    { name:"Action", selector:(row) => (
        <div className='flex space-x-4'>
          <Button  
            className='px-3 py-1 bg-teal-600 text-white font-bold rounded'
            onClick={(e) => {setMode("edit"); handleShowModal(row._id,"edit")}
            } 
            // to={`#/mode=edit&id:${row._id}`} 
           // to=""
          >
               Edit
          </Button>

          <Button
            className='px-3 py-1 bg-red-600 text-white font-bold rounded'
            onClick={async (e) => {
                await obj.DeleteEmployee(row._id);  
                await GetAllEmployee();  
            }} >
            Delete
          </Button>

          <Link
            className='px-3 py-1 bg-yellow-600 text-white font-bold rounded'
            to="./ViewEmployee"
            >
            View
          </Link>

      </div>
      )
    }
  ]
 
  const GetAllEmployee = async() => {
     
    try{
      const response = await obj.GetAllEmployees();

      if(response.success){
        let sno = 1;
        const list = await response.data.map((emp) =>({
          _id: emp._id,  
          sno:sno++,   
          employeecode :emp.employeecode,
          firstname: emp.firstname +' '+emp.lastname,  
          ///department: emp.department.departmentname != "" ? emp.department.departmentname:'', 
          disabled:emp.disabled
        })) 
 
        setEmployeelist(list);         
      }
      else{
        setEmployeelist([]);
      } 
    }
    catch(error){ 
      console.log(error);
    }

    setPending(false);
  }


  useEffect(() =>{
   

    async function fetchDesignations() {
      try {
        const designationData = await objdesig.GetAllDesignations();
        const designationArray = Array.isArray(designationData.data)
        ? designationData.data
        : Object.values(designationData.data);

        setDesignation(designationArray); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching designations:', error);
      }
    }

    async function fetchDepartment() {
      try {
        const data = await objdept.GetAllDepartmentsNew();
        const dataarray = Array.isArray(data.data)
        ? data.data
        : Object.values(data.data);
 
        setDepartment(dataarray); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching designations:', error);
      }
    }

    GetAllEmployee(); 
    fetchDesignations();
    fetchDepartment();

  },[])
  
  
  const filteredData = list.filter(item =>  item.firstname.toLowerCase().includes(searchQuery.toLowerCase())  );

  return (
    <div className='bg-white'>  
    
    {showModal ? (
        <>
         
           <div className='max-w-6xl max-auto mt-10 bg-white p-9 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mv-6'>Add New Employee</h2>
            <br />
 
            <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Form Fields */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="employeecode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Employee Code"
                  fullWidth
                  error={!!errors.employeecode}
                  helperText={errors.employeecode ? errors.employeecode.message : ''}
                />
              )}
            />
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstname}
                  helperText={errors.firstname ? errors.firstname.message : ''}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastname}
                  helperText={errors.lastname ? errors.lastname.message : ''}
                />
              )}
            />
            <Controller
              name="contactno"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Number"
                  fullWidth
                  error={!!errors.contactno}
                  helperText={errors.contactno ? errors.contactno.message : ''}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="emailid"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email ID"
                  fullWidth
                  error={!!errors.emailid}
                  helperText={errors.emailid ? errors.emailid.message : ''}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                {...field}
                fullWidth
                displayEmpty
                error={!!errors.gender}
                defaultValue="" // Ensure the placeholder is shown initially
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                {obj.genderOptions.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller 
              name="department"
              control={control}
              render={({ field }) => (
                 
                <Select
                {...field}
                fullWidth
                displayEmpty
                error={!!errors.department}
                defaultValue="">
                <MenuItem value="" disabled>
                  Select Department
                </MenuItem>
                {dept.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.departmentname}
                  </MenuItem>
                ))}
              </Select>

              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                {...field}
                fullWidth
                displayEmpty
                error={!!errors.role}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {obj.roleOptions.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Select
                {...field}
                fullWidth
                displayEmpty
                
                error={!!errors.designation}
                defaultValue="">
                <MenuItem value="" disabled>
                  Select Designation
                </MenuItem>
                {deisng.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.designationname}
                  </MenuItem>
                ))}
              </Select>
              )}
            />
            <Controller
              name="dateofJoining"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Joining"
                  type="date"
                  fullWidth
                  error={!!errors.dateofJoining}
                  helperText={errors.dateofJoining ? errors.dateofJoining.message : ''}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.address}
                  helperText={errors.address ? errors.address.message : ''}
                />
              )}
            />
          </Box>

          {mode === 'new' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />

              
                <Controller
                  name="salary"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Salary"
                      type="text"
                      fullWidth
                      error={!!errors.salary}
                      helperText={errors.salary ? errors.salary.message : ''}
                    />
                  )}
                />
          </Box>
        )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1,gap:3 }}>

          <Button type="submit" color="primary" className='px-4 py-1 bg-teal-400 rounded text-white'>
              Submit
            </Button>
            <Button 
              className="px-4 py-1 bg-red-400 rounded text-white"

                onClick={(e) => {ResetForm(); setShowModal(false); }} color="secondary">
              Cancel
            </Button>
           
          </Box>
      
        </Box>

            
           </div>
           
        </>
      ) : 
      
      <>
 
        <div className='text-center'>
          <h3 className='text-2xl font-bold mb-6'>Manage Employees</h3>
        </div>

        <div className='flex justify-between items-center px-3'>           
          <BasicSearchInput onChange={(e) =>setSearchQuery(e.target.value)}/>
          
          <div className="flex shrink-0 flex-col gap-2 sm:flex-column">
            <Link to={''} className='px-4 py-1 bg-teal-400 rounded text-white' onClick={() => {setMode('new') ;setShowModal(true) ; }} >
              Add Employee
            </Link>
          </div>
        </div>
         
          <br />
          
          <DataTable 
            columns={columns} 
            data={filteredData} 
            pagination 
            progressPending={pending} 
            progressComponent={<CustomLoader />}
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: '#00897b',
                  color: 'black', // Optional: set text color
                  fontSize:'small',
                   
                },
              },
            }}
          />
      </>

      }
      
    </div>
  );
};
 

const listEmployee = () =>{
  return(
     
    <>
 
    <div className='text-center'>
      <h3 className='text-2xl font-bold mb-6'>Manage Employees</h3>
    </div>

    <div className='flex justify-between items-center px-3'>           
      <BasicSearchInput onChange={(e) =>setSearchQuery(e.target.value)}/>
      
      <div className="flex shrink-0 flex-col gap-2 sm:flex-column">
        <Link to={''} className='px-4 py-1 bg-teal-400 rounded text-white' onClick={() => {setMode('new') ;setShowModal(true) ; }} >
          Add Employee
        </Link>
      </div>
    </div>
     
      <br />
      
      <DataTable 
        columns={columns} 
        data={filteredData} 
        pagination 
        progressPending={pending} 
        progressComponent={<CustomLoader />}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: '#00897b',
              color: 'black', // Optional: set text color
              fontSize:'small',
               
            },
          },
        }}
      />
  </>
  
  );
}
export default SaveEmployee;



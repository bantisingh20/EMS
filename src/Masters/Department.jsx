import React,{useEffect, useState} from 'react';
import { FormControl, FormLabels, handleError, handleSuccess ,TextFields} from '../Pages/Common';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate ,Navigate, useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; 
import DataTable from 'react-data-table-component';
import { CustomLoader } from '../Pages/loader'
import { DepartmentsClass } from '../utilis/department';
 

const DepartmentPage = () => {
   
  const navigate = useNavigate();
  const departments = new DepartmentsClass(); 
  const [SubmitDepartmentData,setDepartment] = useState({
    _id:'0'
    ,departmentname:''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentlist,setDepartmentlist] = useState([]);
  const location = useLocation();
  const [pending, setPending] = React.useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [mode,setMode]= useState("new")
  
  const handleOnclickForCommonButton = async () =>{
    setMode("new");
    setShowModal((prevShowModal) => !prevShowModal);
    setDepartment({ _id: '0', departmentname: '' });

  }
   
  //const hash = location.hash;
 
  const handleShowModal = async (name,id) => {
     
    const departmentData = {
      _id: id,
      departmentname: name,
    };
    await setDepartment(departmentData); 
    await setMode("old");
    await setShowModal(true);
     
  };

  
  const columns  = [
    {
      name:"Sr.No",
      sortable: true,
      selector:(row) => row.sno
    },
    {
      name:"Department",
      sortable: true,
      selector:(row) => row.departmentname
    },
    {
      name:"Action",
      selector:(row) => (
        <div className='flex space-x-4'>
          <Link  
            className='px-3 py-1 bg-teal-600 text-white font-bold rounded'
            onClick={() => handleShowModal(row.departmentname, row._id)} to={''}          >
              Edit Department
          </Link>

          <Button
            className='px-3 py-1 bg-red-600 text-white font-bold rounded'
            onClick={async () => {
                await departments.DeleteDepartmentById(row._id);  
                await GetAllDepartment();  
            }} >
            Delete
          </Button>

      </div>
      )
    }
  ]
 
  const filteredData = departmentlist.filter(item => 
    item.departmentname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await departments.SaveNewDepartment(SubmitDepartmentData);
      if(response.success){
        setShowModal(false); 
        await GetAllDepartment();
        await handleSuccess('Department Save Successfully');
                 
      }
      else{
        handleError(response.message);
      }
    } catch (error) { 
       handleError(error);
       handleError(error.message);
    }
     
  }

  const UpdateDepartment = async(e) => {
    e.preventDefault();
    // Handle update
    console.log(SubmitDepartmentData)

    try {
      const response = await departments.UpdateDepartment(SubmitDepartmentData);
      if(response.success){
        setShowModal(false); 
        await GetAllDepartment();
        await handleSuccess('Update Successfully');
                 
      }
      else{
        handleError(response.message);
      }
    } catch (error) { 
       handleError(error);
       handleError(error.message);
    }
  };

  const GetAllDepartment = async() =>{
    
    try{
      const response = await departments.GetAllDepartmentsNew();

      if(response.success){
        let sno = 1;
        const list = await response.data.map((dep) =>({
          _id: dep._id,   sno:sno++,       departmentname: dep.departmentname,   disabled:dep.disabled
        })) 
        setDepartmentlist(list);         
      }
      else{
        setDepartmentlist([]);
      } 
    }
    catch(error){ 
      console.log(error);
    }

    setPending(false);
  }

  useEffect(() =>{
    GetAllDepartment();
  },[])
   
  return (
    <div>  
    
    {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"  >
            <div className="relative w-auto my-6 mx-auto max-w-sm">               
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                 
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {mode =="new" ? "Add Department" :"Update Department"}   
                  </h3>
                  <button
                    className="p-1 ml-auto bg-red border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleOnclickForCommonButton()} >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                 
                <div className="relative p-6 flex-auto">   
                    <Form onSubmit={mode =="new" ? handleSubmit : UpdateDepartment}>
                      <FormLabels label="Department Name:" className='text-sm font-medium text-gray-700' />
                      <Form.Control
                      type="text" 
                      placeholder="Enter Department Name" 
                      className='mt-1 w-full p-2 border border-gray-300 rounded-md' 
                      required={true}
                      value={SubmitDepartmentData.departmentname}
                      onChange={(e) => setDepartment({...SubmitDepartmentData,[e.target.name]:e.target.value})} 
                      name="departmentname" />

                      <Button type="submit" className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                        disabled={isDisabled} >
                          {mode =="new"  ? "Save" :"Update"}
                      </Button>
                      
                    </Form>               
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                   
                  <Link to="/dashboard/department" 
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => handleOnclickForCommonButton()}
                  > Close </Link>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
          <ToastContainer />
        </>
      ) : 
      
      <>
 
        <div className='text-center'>
          <h3 className='text-2xl font-bold mb-6'>Manage Department</h3>
        </div>

        <div className='flex justify-between items-center px-3'>
          <input 
            type="text" 
            placeholder='Search Department' 
            className='form-control px-4 py-0.5' 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={''} className='px-4 py-1 bg-teal-400 rounded text-white' onClick={() => handleOnclickForCommonButton()} >
            Add New Department
          </Link>
        </div>
          <ToastContainer />
          <br />
          
          <DataTable columns={columns} data={filteredData} pagination 
            progressPending={pending}
            progressComponent={<CustomLoader />}/>

      </>

      }
      
    </div>
  );
};
 

export default DepartmentPage;
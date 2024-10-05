import React,{useEffect, useState} from 'react';
import { FormControl, FormLabels, handleError, handleSuccess } from '../Pages/Common';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate ,Navigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; 
import DataTable from 'react-data-table-component';
import { CustomLoader } from '../Pages/loader'
import { DepartmentsClass } from '../utilis/department';

const Department = () => {
   
  const navigate = useNavigate();
  const departments = new DepartmentsClass(); 
  const [isDisabled, setIsDisabled] = useState(false);
  const [departmentlist,setDepartmentlist] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  
  const handleShowModal = (name,id) => {
    const departmentData = {
      departmentname: name,
      departmentid: id,
    };
    setShowModal(true);
    console.log(departmentData);  
  };

  const columns = [
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
            to="/dashboard/department?mode=edit#Update-Department" 
            onClick={() => handleShowModal(row.departmentname,row._id)} 
            className='px-3 py-1 bg-teal-600 text-white font-bold rounded'
          >
            Edit
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
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
     
    try {
      const response = await departments.SaveNewDepartment();
      if(response.success){
        setShowModal(false);
        navigate('/dashboard/department')
        await GetAllDepartment();
        await handleSuccess('Department Save Successfully');
        // await new Promise(resolve => setTimeout(resolve, 1000));
        
        
      }
      else{
        handleError(response.message);
      }
    } catch (error) {
      //console.log(`Error: ${error}`);
       handleError(error);
       handleError(error.message);
    }
     
  }


  const GetAllDepartment = async() =>{
    
    try{
      const response = await departments.GetAllDepartmentsNew();

      if(response.success){
        let sno = 1;
        const list = await response.data.map((dep) =>({
          _id: dep._id,
          sno:sno++,
          departmentname: dep.departmentname,
          disabled:dep.disabled

        }))
        setDepartmentlist(list);
         
      }
      else{
        setDepartmentlist([]);
      } 
    }
    catch(error){
      // alert(error);
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
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                  Add Department  
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                 
           <div>
            <Form onSubmit={handleSubmit}>
              <FormLabels label="Department Name:" className='text-sm font-medium text-gray-700' />
              <Form.Control
               type="text" 
               placeholder="Enter Department Name" 
               className='mt-1 w-full p-2 border border-gray-300 rounded-md' 
               required={true}
              //  onChange={(e) => setDepartment({ ...department, [e.target.name]: e.target.value })} //for object
               onChange={(e) => departments.handleInputChange([e.target.name], e.target.value)} 
               name="departmentname" />

              <Button type="submit" className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
              disabled={isDisabled} >
             
             Add
           </Button> 
            </Form>
             
            
           </div>
           
          
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                   
                  <Link to="/dashboard/department" 
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
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
        />
        <Link 
          to="/dashboard/department#add-New-Department" 
          className='px-4 py-1 bg-teal-400 rounded text-white'
          // onClick={toggleAddDepartment}
          onClick={() => setShowModal(true)}
        >
          Add New Department
        </Link>
      </div>
        <ToastContainer />
        <br />
         
        <DataTable columns={columns} data={departmentlist} pagination 
          progressPending={pending}
          progressComponent={<CustomLoader />}/>

        </>
      }
      
    </div>
  );
};
 

export default Department;
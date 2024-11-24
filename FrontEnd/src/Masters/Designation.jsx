import React,{useEffect, useState} from 'react';
import { FormControl, FormLabels, handleError, handleSuccess ,BasicSearchInput, AppDataTable} from '../Pages/Common';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate ,Navigate, useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'; 
import DataTable from 'react-data-table-component';
import { CustomLoader } from '../Pages/loader'
import { DesignationClass } from '../utilis/designation';
 

const DesignationPage = () => {
   
  const navigate = useNavigate();
  const designation = new DesignationClass();  
  const [SubmitDetails,setSubmitDetails] = useState(designation.designation); 
 
  const [searchQuery, setSearchQuery] = useState('');
  const [designationlist,setdesignationlist] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [mode,setMode]= useState("new")
  
  const handleOnclickForCommonButton = async () =>{
    setMode("new");
    setSubmitDetails(designation.designation);
    setShowModal((prevShowModal) => !prevShowModal);

  }
    
  const handleShowModal = async (name,id) => { 
    designation.designation.designationname=name;
    designation.designation._id=id; 
    console.log(designation.designation)     
    setSubmitDetails(designation.designation); 
 
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
      name:"Designation",
      sortable: true,
      selector:(row) => row.designationname
    },
    {
      name:"Action",
      selector:(row) => (
        <div className='flex space-x-4'>
          <Link  
            className='px-3 py-1 bg-teal-600 text-white font-bold rounded'
            onClick={() => handleShowModal(row.designationname, row._id)} to={''}          >
              Edit Designation
          </Link>

          <Button
            className='px-3 py-1 bg-red-600 text-white font-bold rounded'
            onClick={async () => {
                await designation.DeleteDesignationById(row._id);  
                await GetAllDesignation();  
            }} >
            Delete
          </Button>

      </div>
      )
    }
  ]
 
  const filteredData = designationlist.filter(item => 
    item.designationname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    
    e.preventDefault();  
    const myDesignation = designation.setDesignation(SubmitDetails);
     console.log(designation.getInfo())
    try {
      const response = await designation.SaveNewDesignation();
      if(response.success){
        setShowModal(false); 
        await GetAllDesignation();
        await handleSuccess('Designation Save Successfully');
                 
      }
      else{
        handleError(response.message);
      }
    } catch (error) { 
       handleError(error);
       handleError(error.message);
    }
     
  }


  const GetAllDesignation = async() =>{
    
    try{
      const response = await designation.GetAllDesignations();

      if(response.success){
        let sno = 1;
        const list = await response.data.map((dep) =>({
          _id: dep._id,   sno:sno++,       designationname: dep.designationname,   disabled:dep.disabled
        })) 
        setdesignationlist(list);         
      }
      else{
        setdesignationlist([]);
      } 
    }
    catch(error){ 
      console.log(error);
    }

    setPending(false);
  }

  useEffect(() =>{
    GetAllDesignation();
  },[])
   
  return (
    <div className='bg-white'>  
    
    {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"  >
            <div className="relative w-auto my-6 mx-auto max-w-sm">               
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                 
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {mode =="new" ? "Add Designation" :"Update Designation"}   
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
                    <Form onSubmit={handleSubmit}>
                      <FormLabels label="Designation Name:" className='text-sm font-medium text-gray-700' />
                      <Form.Control
                      type="text" 
                      placeholder="Enter Designation Name" 
                      className='mt-1 w-full p-2 border border-gray-300 rounded-md' 
                      required={true}
                      value={SubmitDetails.designationname}
                      onChange={(e) => setSubmitDetails({...SubmitDetails,[e.target.name]:e.target.value})} 
                      // onChange={(e) => designation.handleInputChange(e.target.name, e.target.value)} 
                      name="designationname" />

                      <Button type="submit" className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                        disabled={isDisabled} >
                          {mode =="new"  ? "Save" :"Update"}
                      </Button>
                      
                    </Form>               
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                   
                  <Link to="/dashboard/designation" 
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => handleOnclickForCommonButton()}
                  > Close </Link>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
          
        </>
      ) : 
      
      <>
 
        <div className='text-center'>
          <h3 className='text-2xl font-bold mb-6'>Manage Designation</h3>
        </div>

        <div className='flex justify-between items-center px-3'>

          <BasicSearchInput onChange={(e) =>setSearchQuery(e.target.value)}/>
          
          <Link to={''} className='px-4 py-1 bg-teal-400 rounded text-white' onClick={() => handleOnclickForCommonButton()} >
            Add New Designation
          </Link>
        </div>
           
          {/* <br />
          
          <DataTable columns={columns} data={filteredData} pagination 
            progressPending={pending}
            progressComponent={<CustomLoader />}/> */}

            <AppDataTable 
            columns={columns} 
            data={filteredData} 
             pending={pending}  
 
          />

      </>

      }
      
    </div>
  );
};
 

export default DesignationPage;
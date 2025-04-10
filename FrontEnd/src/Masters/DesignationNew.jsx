import React, { useEffect, useState } from 'react';
import { AppDataTable,BasicSearchInput, FormInputField, handleError, handleSuccess, LazyLoadingComponent } from '../Pages/Common';
import { Link, useNavigate, useLocation,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DeleteDesignationById, GetAllDesignationsNew, GetDesignationById, SaveNewDesignation, Updatedesignation } from '../api/DesignationApi';
import {useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup'; 

const DesignationListPage = () =>{
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [Masterlist, DataList] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    GetAllDepartment();
  }, []);

  const GetAllDepartment = async () => {
    try {
      const response = await GetAllDesignationsNew();
      if (response.success) {         
        console.log(response.data)
        DataList(response.data);
      } else {
        DataList([]);
      }
    } catch (error) {
      console.error(error);
    }
    setPending(false);
  };


  const columns = [
    {
      name: "Sr.No",
      selector: (row,index) =>  index + 1,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designationname,
      sortable: true,
    },
      {
      name: "Action",
      selector: (row) => (
        <div className='flex space-x-4'>
          
          <Link
            className='px-3 py-1 bg-teal-600 text-white rounded'
            to={`/dashboard/edit-designation/${row.designationid}`}
          >
            Edit
          </Link>


          <Button
            className='px-3 py-1 bg-red-600 text-white rounded'
            onClick={async () => {
              await DeleteDesignationById(row.designationid);
              await GetAllDepartment();
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredData = Masterlist.filter(item =>
    item.designationname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-white  '>
     
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Manage Designation</h3>
          </div>
          <div className="flex justify-between items-center px-4">
            <BasicSearchInput onChange={(e) => setSearchQuery(e.target.value)} />
            <Button className="bg-teal-500 text-white rounded px-4 py-1" onClick={()=>navigate('/dashboard/save/designation')}>
              Add New Designation
            </Button>
          </div>
          
          <AppDataTable 
            columns={columns} 
            data={filteredData} 
            progressPending={pending}  
             
          />
      
    </div>
  );
}
 

const DesignationSubmitPage = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();   
  const [department, setDepartment] = useState(null);   

 
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchDepartmentData = async () => {
        try {
          
          const data = await GetDesignationById(id);
 
          setDepartment(data);
          console.log(department)
        } catch (error) {
          console.error('Error fetching department data:', error);
        }
      };
      fetchDepartmentData();
    }
  }, [mode, id]);

  const initialValues = {
    
    name: mode === 'edit' && department ? department.name : '',
       
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Designation name is required'),
  });

  const handleSubmit = async (values) => {
    try {
      let response;
      if (mode === 'new') {
        response = await SaveNewDesignation(values);
      } else if (mode === 'edit' && id) {
      
        response = await Updatedesignation( JSON.stringify({
          _id: id,           
          name: values.name,   
        }));
      }

      if (response.success) {
        navigate('/dashboard/list-designation');
        handleSuccess('Designation Save successfully');
      } else {
        handleError(response.message);
      }
    } catch (error) {
      handleError(error.message);
       
    }
  };
 
  if (mode === 'edit' && !department) {
    return <LazyLoadingComponent />;
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            {mode === 'new' ? 'Add New Designation' : 'Edit Designation'}
          </h2>
          <Formik
            enableReinitialize={true} // This ensures Formik will reinitialize the form when initialValues change
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-6">
                  <FormInputField
                    type="text"
                    placeholder="Enter Designation Name"
                    label="Designation Name"
                    id="name"
                    name="name"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {mode === 'new' ? 'Submit' : 'Update'}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/dashboard/list-designation')}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export  {DesignationSubmitPage,DesignationListPage};



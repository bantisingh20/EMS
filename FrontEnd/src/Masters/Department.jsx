import React, { useEffect, useState } from 'react';
import { AppDataTable,BasicSearchInput, FormInputField, handleError, handleSuccess, LazyLoadingComponent } from '../Pages/Common';
import { Link, useNavigate, useLocation,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DeleteDepartmentById, GetAllDepartmentsNew, GetDepartmentById, SaveNewDepartment, UpdateDepartment } from '../api/DepartmentApi';
import {useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup'; 

const DepartmentList = () =>{
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentlist, setDepartmentlist] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    GetAllDepartment();
  }, []);

  const GetAllDepartment = async () => {
    try {
      const response = await GetAllDepartmentsNew();
      if (response.success) {         
        setDepartmentlist(response.data);
      } else {
        setDepartmentlist([]);
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
      name: "Department",
      selector: (row) => row.departmentname,
      sortable: true,
    },
      {
      name: "Action",
      selector: (row) => (
        <div className='flex space-x-4'>
          
          <Link
            className='px-3 py-1 bg-teal-600 text-white rounded'
            to={`/dashboard/edit-department/${row.departmentid}`}
          >
            Edit
          </Link>


          <Button
            className='px-3 py-1 bg-red-600 text-white rounded'
            onClick={async () => {
              await DeleteDepartmentById(row.departmentid);
              await GetAllDepartment();
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredData = departmentlist.filter(item =>
    item.departmentname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-white  '>
     
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Manage Department</h3>
          </div>
          <div className="flex justify-between items-center px-4">
            <BasicSearchInput onChange={(e) => setSearchQuery(e.target.value)} />
            <Button className="bg-teal-500 text-white rounded px-4 py-1" onClick={()=>navigate('/dashboard/save/department')}>
              Add New Department
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
 

const DepartmentPage = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();   
  const [department, setDepartment] = useState(null);   

 
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchDepartmentData = async () => {
        try {
          
          const data = await GetDepartmentById(id);
          setDepartment(data);
        } catch (error) {
          console.error('Error fetching department data:', error);
        }
      };
      fetchDepartmentData();
    }
  }, [mode, id]);

  const initialValues = {
    departmentname: mode === 'edit' && department ? department.departmentname : '',  
  };

  const validationSchema = Yup.object({
    departmentname: Yup.string().required('Department name is required'),
  });

  const handleSubmit = async (values) => {
    try {
      let response;
      if (mode === 'new') {
        response = await SaveNewDepartment(values);
      } else if (mode === 'edit' && id) {
      
        response = await UpdateDepartment( JSON.stringify({
          _id: id,           
          departmentname: values.departmentname,   
        }));
      }

      if (response.success) {
        navigate('/dashboard/list-department');
        handleSuccess('Department Save successfully');
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
            {mode === 'new' ? 'Add New Department' : 'Edit Department'}
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-6">
                  <FormInputField
                    type="text"
                    placeholder="Enter Department Name"
                    label="Department Name"
                    id="departmentname"
                    name="departmentname"
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
                    onClick={() => navigate('/dashboard/list-department')}
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

export  {DepartmentPage,DepartmentList};



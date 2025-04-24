import React,{useState ,useEffect} from 'react'; 
import FormikFormComponent from '../Components/FormikFormComponent';  
import { Button } from 'react-bootstrap';
import { GetAllDepartmentsNew } from '../api/DepartmentApi';
import { GetAllDesignationsNew } from '../api/DesignationApi';
import { handleSuccess,handleError, AppDataTable, BasicSearchInput } from '../Pages/Common';
import { Link, useNavigate, useLocation,useParams } from 'react-router-dom'; 
import { DeleteEmployeeById, GetAllEmployee, SaveUpdateEmployee } from '../api/EmployeeApi';


const EmployeeSubmitPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [formData, setFormData] = useState({
    Employeecode:'',
    employeeid :0,
    FirstName: '',
    LastName: '',
    email: '',
    phone: '',
    dateofbirth: '',
    DateofJoining: '',
    department: '0',
    designation: '0',
    password:'',
    usergroup :'0',
  });


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const deptData = await GetAllDepartmentsNew();
        const desgData = await GetAllDesignationsNew();

        console.log(deptData.data)
        setDepartments(
          deptData.data.map(dept => ({ label: dept.name, value: dept.id }))
        );
        setDesignations(
          desgData.data.map(desg => ({ label: desg.name, value: desg.id }))
        );
      } catch (error) {
        console.error('Error fetching department/designation:', error);
      }
    };

    fetchOptions();
  }, []);

const handleReset = () => {
    setFormData({
      Employeecode:'',
      employeeid:0,
      FirstName: '',
      LastName: '',
      email: '',
      phone: '',
      dateofbirth: '',
      DateofJoining: '',
      department: '0',
      designation: '0', 
      password:'',
    });
 
};

const handleSubmit = async (values) => {
    try {

      const response = await  SaveUpdateEmployee(values); //axiosInstance.post('/employees/save-employees',values);
      console.log(response)
      
      if (response.success) { 
        navigate('/dashboard/list-employees');
        handleSuccess(response.message);
      } else {
        handleError(response.message);
      }
 
    } catch (error) {
      handleError(error.response.data.message);
    }

};


const FormFields = [
{ name: 'Employeecode', label: 'Employee code', type: 'text', placeholder: 'Enter your Employee code', validation: { required: true } },
{ name: 'FirstName', label: 'First Name', type: 'text', placeholder: 'Enter your First Name', validation: { required: true } },
{ name: 'LastName', label: 'Last Name', type: 'text', placeholder: 'Enter your Last Name', validation: { required: true } },
{ name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', validation: { required: true } },
{ name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email', validation: { required: true }},
{ name: 'dateofbirth', label: 'Date of Birth', type: 'date', placeholder: 'Select Date of Birth', validation: { required: false } },
{ name: 'DateofJoining', label: 'Date of Joining', type: 'date', placeholder: 'Select Date of Joining', validation: { required: false } },
{ name: 'usergroup', label: 'User Group', type: 'select', placeholder: 'Select usergroup', validation: { required: true } , options :[ {label:'superadmin',value:1},{label:'admin',value:2},{label:'user',value:3}]},
{ name: 'department', label: 'Department', type: 'select', placeholder: 'Select Deaprtment', validation: { required: true },options : departments },
{ name: 'designation', label: 'Designation', type: 'select', placeholder: 'Select Deaprtment', validation: { required: true } ,options : designations },
{ name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your Password', validation: { required: true } },
];




  return (
    <div>
         <FormikFormComponent 
          initialValues={formData}
          //validationSchema={validationSchema}
          fields={FormFields}
          onSubmit={handleSubmit}
          
        />
    </div>
  )
}


const ListEmployeeNew = () =>{
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [Masterlist, DataList] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    GetAllDataForList();
  }, []);

  const GetAllDataForList = async () => {
    try {
      const response = await GetAllEmployee();
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
    { name: "Sr.No", selector: (row,index) =>  index + 1, sortable: true, },
    { name: "Employee Code", selector: (row) => row.employeecode, sortable: true, },
    { name: "Employee Name", selector: (row) => row.name, sortable: true, },
    { name: "Email Id", selector: (row) => row.emailid, sortable: true, },    
    { name: "Designation", selector: (row) => row.designationname, sortable: true, },
    { name: "Department", selector: (row) => row.departmentname, sortable: true, },
    { name: "Action", selector: (row) => (
        <div className='flex space-x-4'>         
          <Link className='px-3 py-1 bg-teal-600 text-white rounded' to={`/dashboard/edit-EmployeeSubmitPage/${row.id}`} > Edit </Link>
          <Button className='px-3 py-1 bg-red-600 text-white rounded' onClick={async () => { await DeleteEmployeeById(row.id); await GetAllDataForList();}} > Delete </Button>
        </div>
      ),
    },
  ];

  const filteredData = Masterlist.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-white  '>
     
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center px-4">
            <BasicSearchInput onChange={(e) => setSearchQuery(e.target.value)} />
            <Button className="bg-teal-500 text-white rounded px-4 py-1" onClick={()=>navigate('../list-EmployeeSubmitPage')}>
              Add New Employee
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
  

export {EmployeeSubmitPage,ListEmployeeNew}

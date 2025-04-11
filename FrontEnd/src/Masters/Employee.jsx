import React,{useState} from 'react';
import axiosinstance from '../axiosInstance';
import FormikFormComponent from '../Components/FormikFormComponent'; 
import * as Yup from 'yup';
import axiosInstance from '../axiosInstance';


const EmployeeSubmitPage = () => {

  const [formData, setFormData] = useState({employeeid :0,
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

const handleReset = () => {
    setFormData({
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
      const save = await axiosInstance.post('/employees/save-employees',values);
      console.log(save);
      console.log(values); 
      alert('Form submitted!');
    } catch (error) {
      console.log(error.message);
    }

};


const FormFields = [
{ name: 'FirstName', label: 'First Name', type: 'text', placeholder: 'Enter your First Name', validation: { required: true } },
{ name: 'LastName', label: 'Last Name', type: 'text', placeholder: 'Enter your Last Name', validation: { required: true } },
{ name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', validation: { required: true } },
{ name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email', validation: { required: true }},
{ name: 'dateofbirth', label: 'Date of Birth', type: 'date', placeholder: 'Select Date of Birth', validation: { required: false } },
{ name: 'DateofJoining', label: 'Date of Joining', type: 'date', placeholder: 'Select Date of Joining', validation: { required: false } },
{ name: 'usergroup', label: 'User Group', type: 'select', placeholder: 'Select usergroup', validation: { required: true } , options :[{label:'Select UserGroup',value:0},{label:'superadmin',value:1},{label:'admin',value:2},{label:'user',value:3}]},
{ name: 'department', label: 'Department', type: 'select', placeholder: 'Select Deaprtment', validation: { required: true } , options :[{label:0,value:0},{label:1,value:1},{label:2,value:2},{label:3,value:3}]},
{ name: 'designation', label: 'Designation', type: 'select', placeholder: 'Select Deaprtment', validation: { required: true } , options :[{label:0,value:0},{label:1,value:1},{label:2,value:2},{label:3,value:3}]},
{ name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your Password', validation: { required: true } },
];




  return (
    <div>
         <FormikFormComponent 
          initialValues={formData}
      //  validationSchema={validationSchema}
          fields={FormFields}
          onSubmit={handleSubmit}
        />
    </div>
  )
}

export {EmployeeSubmitPage}

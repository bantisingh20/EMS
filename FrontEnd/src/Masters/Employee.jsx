import React,{useState} from 'react';
import FormikFormComponent from '../Components/FormikFormComponent'; 
import * as Yup from 'yup';


const EmployeeSubmitPage = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    visitDate: '', 
    comingfrom : '',
});

const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      visitDate: '',
      comingfrom: '', 
    });
 
};

const handleSubmit = (values) => {
    console.log(values); 
    alert('Form submitted!');
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object({
  FirstName: Yup.string().required('First Name is required'),
  LastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone :Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('A phone number is required'),
  visitDate :Yup.date().required('Date of birth is required'), 
  visitDate :Yup.date().required('Date of birth is required'), 
    // phone : Yup.number().max(9)
    // .typeError("That doesn't look like a phone number")
    // .positive("A phone number can't start with a minus")
    // .integer("A phone number can't include a decimal point") 
    // .required('A phone number is required'),
  
    comingfrom: Yup.string().required('Coming From is required'), 
    visitDate: Yup.date().required('Date of birth is required'),        
});

const FormFields = [
{ name: 'FirstName', label: 'First Name', type: 'text', placeholder: 'Enter your First Name', validation: { required: true } },
{ name: 'LastName', label: 'Last Name', type: 'text', placeholder: 'Enter your Last Name', validation: { required: true } },
{ name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email', validation: { required: true }},
{ name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', validation: { required: true } },
{ name: 'Dateofbith', label: 'Date of Birth', type: 'date', placeholder: 'Select Date of Birth', validation: { required: false } },
{ name: 'DateofJoining', label: 'Date of Joining', type: 'date', placeholder: 'Select Date of Joining', validation: { required: true } },
{ name: 'department', label: 'Department', type: 'select', placeholder: 'Select Deaprtment', validation: { required: true } ,options :[1,2,3]},
{ name: 'designation', label: 'Designation', type: 'select', placeholder: 'Select Deaprtment', validation: { required: true } ,options :[1,2,3]},
];



  return (
    <div>
         <FormikFormComponent 
       initialValues={formData}
       validationSchema={validationSchema}
       fields={FormFields}
       onSubmit={handleSubmit}
      />
    </div>
  )
}

export {EmployeeSubmitPage}

// import React, { useState, useEffect } from 'react';
// import FormikFormComponent from '../Components/FormikFormComponent';
// import { handleSuccess, handleError } from '../Pages/Common';
// import { SaveNewRole, UpdateRole, GetRoleById } from '../api/RoleService';
// import { useNavigate, useParams } from 'react-router-dom';

// const RoleSubmitForm = ({ mode }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [formData, setFormData] = useState({ name: '', description: '' });

//   useEffect(() => {
//     if (mode === 'edit' && id) {
//       GetRoleById(id)
//         .then((res) => {
//           setFormData({
//             name: res.data.name || '',
//             description: res.data.description || '',
//           });
//         })
//         .catch(console.error);
//     } else {
//       setFormData({ name: '', description: '' });
//     }
//   }, [mode, id]);

//   const handleSubmit = async (values) => {
//     try {
//       const response =
//         mode === 'edit'
//           ? await UpdateRole({ _id: id, ...values })
//           : await SaveNewRole(values);

//       if (response.success) {
//         handleSuccess(response.message);
//         navigate('/dashboard/list-role');
//       } else {
//         handleError(response.data.message);
//       }
//     } catch (error) {
//       handleError(error?.response?.data?.message || 'Error saving role');
//     }
//   };

//   const handleCancel = () => {
//     navigate('/dashboard/list-role');
//   };

//   // Base form fields
//   const FormFields = [
//     {
//       name: 'name',
//       label: 'Role Name',
//       type: 'text',
//       placeholder: 'Enter Role',
//       validation: { required: true },
//     },
//   ];

//   // If in edit mode, add description field
//   if (mode === 'edit') {
//     FormFields.push({
//       name: 'description',
//       label: 'Description',
//       type: 'text',
//       placeholder: 'Enter Description',
//       validation: { required: false },
//     });
//   }

//   return (
//     <FormikFormComponent
//       initialValues={formData}
//       fields={FormFields}
//       onSubmit={handleSubmit}
//       onCancel={handleCancel}
//     />
//   );
// };

// export default RoleSubmitForm;

// src/forms/RoleSubmitForm.jsx
import React from 'react';
import MasterSubmitForm from '../Pages/MasterSubmitForm';
import RoleFormConfig from '../config/role.config';


const RoleSubmitForm = ({ mode }) => {
  const config = RoleFormConfig(mode);
  return <MasterSubmitForm config={config} />;
};

export default RoleSubmitForm;

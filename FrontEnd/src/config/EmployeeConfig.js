// src/config/EmployeeFormConfig.js
import {
  SaveUpdateEmployee, GetAllEmployee,UpdateEmployee,
  GetEmployeeById,
   DeleteEmployeeById,
} from '../api/EmployeeApi';


import { GetAllDepartmentsNew } from '../api/DepartmentApi';
import { GetAllDesignationsNew } from '../api/DesignationApi';
import { GetAllRoles } from '../api/RoleService';
import { Update } from '@mui/icons-material';

// src/config/EmployeeListConfig.js ';

export const EmployeeListConfig = {
  title: 'Manage Employees',
  fetchData: GetAllEmployee,
  deleteData: DeleteEmployeeById,
  getId: (row) => row._id,
  columns: [
    { field: 'id', headerName: 'Sr.No', width: 80 },
    { field: 'employeecode', headerName: 'Code', width: 100 },
    { field: 'firstname', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'emailid', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 140 },
  ],
  addButton: {
    label: 'Add Employee',
    onClick: (navigate) => navigate('/dashboard/save/employee'),
  },
  actions: true,
  rowActions: (row, navigate, handleDelete) => [
    {
      label: 'Edit',
      color: 'info',
      type: 'edit',
      onClick: () => navigate(`/dashboard/edit-employee/${row._id}`),
    },
    {
      label: 'Delete',
      color: 'error',
      type: 'delete',
      onClick: () => handleDelete(row._id),
    },
    {
      label: 'View',
      color: 'warning',
      type: 'view',
      onClick: () => handleDelete(row._id),
    },
  ],
};


const EmployeeFormConfig = (mode) => ({
  mode,
  initialValues: {
    employeecode: '',
    employeeid: 0,
    firstname: '',
    lastname: '',
    emailid: '',
    contactno: '',
    dateofbith: '',
    dateofJoining: '',
    department: '0',
    designation: '0',
    password: '',
    role: '0',
  },
  fields: [
    { name: 'employeecode', label: 'Employee Code', type: 'text', validation: { required: true } },
    { name: 'firstname', label: 'First Name', type: 'text', validation: { required: true } },
    { name: 'lastname', label: 'Last Name', type: 'text', validation: { required: true } },
    { name: 'emailid', label: 'Email', type: 'email', validation: { required: true } },
    { name: 'contactno', label: 'Phone', type: 'text', validation: { required: true } },
    { name: 'dateofbith', label: 'Date of Birth', type: 'date' },
    { name: 'dateofJoining', label: 'Date of Joining', type: 'date' },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: async () => {
        const res = await GetAllDepartmentsNew();
        return res.data.map((d) => ({ label: d.departmentname, value: d._id }));
      },
      validation: { required: true }
    },
    {
      name: 'designation',
      label: 'Designation',
      type: 'select',
      options: async () => {
        const res = await GetAllDesignationsNew();
        return res.data.map((d) => ({ label: d.designationname, value: d._id }));
      },
      validation: { required: true }
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: async () => {
        const res = await GetAllRoles();
        return res.data.map((g) => ({ label: g.name, value: g._id }));
      },
      validation: { required: true }
    },
    { name: 'password', label: 'Password', type: 'password', validation: { required: mode === 'create' } },
  ],
 
  fetchById: GetEmployeeById,
  mapResponseToValues: (res) => ({
    employeecode: res?.employeecode || '',
    employeeid: res?.employeeid || 0,
    firstname: res?.firstname || '',
    lastname: res?.lastname || '',
    emailid: res?.emailid || '',
    contactno: res?.contactno || '',
    dateofbith: res?.dateofbith?.split('T')[0] || '',
    dateofJoining: res?.dateofJoining?.split('T')[0] || '',
    department: res?.department || '0',
    designation: res?.designation || '0',
    role: res?.role || '0',
    password: res?.originalpassword || '',
  }),
  createFunction: SaveUpdateEmployee,
  updateFunction: UpdateEmployee,
  redirectPath: '/dashboard/list-employee',
});

export default EmployeeFormConfig;

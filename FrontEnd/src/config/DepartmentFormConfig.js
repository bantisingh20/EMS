// src/config/DepartmentFormConfig.js
import {
  SaveNewDepartment,
  UpdateDepartment,
  GetDepartmentById,
  GetAllDepartmentsNew,
  DeleteDepartmentById,
} from '../api/DepartmentApi';

const DepartmentFormConfig = (mode) => ({
  mode,
  initialValues: { departmentname: '' },
  fields: [
    {
      name: 'departmentname',
      label: 'Department Name',
      type: 'text',
      placeholder: 'Enter Department Name',
      validation: { required: true },
    },
  ],
  fetchById: GetDepartmentById,
  mapResponseToValues: (res) => ({
    departmentname: res?.departmentname || '',
  }),
  createFunction: SaveNewDepartment,
  updateFunction: UpdateDepartment,
  redirectPath: '/dashboard/list-department',
});



export const DepartmentListConfig = {
  title: 'Manage Departments',
  fetchData: GetAllDepartmentsNew,
  deleteData: DeleteDepartmentById,
  getId: (row) => row._id,
  actions: true,
  columns: [
    // { field: 'id', headerName: 'Sr.No', width: 80 },
    { field: 'departmentname', headerName: 'Department Name', flex: 1 }
  ],
  addButton: {
    label: 'Add Department',
    onClick: (navigate) => navigate('/dashboard/save/department')
  },
  rowActions: (row, navigate, handleDelete) => [
    {
      label: 'Edit',
      color: 'info',
      type: 'edit',
      onClick: () => navigate(`/dashboard/edit-department/${row._id}`)
    },
    {
      label: 'Delete',
      color: 'error',
      type: 'delete',
      onClick: () => handleDelete(row._id)
    }
  ]
};
export default DepartmentFormConfig;

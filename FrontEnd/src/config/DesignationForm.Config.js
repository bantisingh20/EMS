// src/config/DepartmentFormConfig.js
import { Delete, Save } from '@mui/icons-material';
import {
  SaveNewDesignation,
  Updatedesignation,
  GetDesignationById,DeleteDesignationById,
  GetAllDesignationsNew,
} from '../api/DesignationApi';

const DesignationFormConfig = (mode) => ({
  mode,
  initialValues: { designationname: '' },
  fields: [
    {
      name: 'designationname',
      label: 'Designation Name',
      type: 'text',
      placeholder: 'Enter Designation Name',
      validation: { required: true },
    },
  ],
  fetchById: GetDesignationById,
  mapResponseToValues: (res) => ({
    designationname: res?.designationname || '',
  }),
  createFunction: SaveNewDesignation,
  updateFunction: Updatedesignation,
  redirectPath: '/dashboard/list-designation',
});


export const DesignationListConfig = {
  title: 'Manage Designations',
  fetchData: GetAllDesignationsNew,
  deleteData: DeleteDesignationById,
  getId: (row) => row._id,
  columns: [
    // { field: 'id', headerName: 'Sr.No', width: 80 },
    { field: 'designationname', headerName: 'Designation Name', flex: 1 }
  ],
  addButton: {
    label: 'Add Designation',
    onClick: (navigate) => navigate('/dashboard/save/designation')
  },
  actions: true,
  rowActions: (row, navigate, handleDelete) => [
    {
      label: 'Edit',
      color: 'info',
      type: 'edit',
      onClick: () => navigate(`/dashboard/edit-designation/${row._id}`)
    },
    {
      label: 'Delete',
      color: 'error',
      type: 'delete',  
      onClick: () => handleDelete(row._id)
    }
  ]
};
export default DesignationFormConfig;

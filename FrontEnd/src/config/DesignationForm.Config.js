// src/config/DepartmentFormConfig.js
import { Save } from '@mui/icons-material';
import {
  SaveNewDesignation,
  Updatedesignation,
  GetDesignationById,
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

export default DesignationFormConfig;

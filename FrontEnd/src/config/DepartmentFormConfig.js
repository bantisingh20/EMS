// src/config/DepartmentFormConfig.js
import {
  SaveNewDepartment,
  UpdateDepartment,
  GetDepartmentById,
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

export default DepartmentFormConfig;

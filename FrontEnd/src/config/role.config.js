// src/config/RoleFormConfig.js
import { actions } from 'react-table';
import { SaveNewRole, UpdateRole, GetRoleById } from '../api/RoleService';
import { GetAllRoles, DeleteRoleById } from '../api/RoleService';
const RoleFormConfig = (mode) => ({
  mode,
  initialValues: { name: '', description: '' },
  fields: [
    {
      name: 'name',
      label: 'Role Name',
      type: 'text',
      placeholder: 'Enter Role Name',
      validation: { required: true },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Enter Description',
      validation: { required: false },
    },
  ],
  fetchById: GetRoleById,
  mapResponseToValues: (res) => ({
    name: res.data.name || '',
    description: res.data.description || '',
  }),
  createFunction: SaveNewRole,
  updateFunction: UpdateRole,
  redirectPath: '/dashboard/list-role',
});

 
// src/config/RoleListConfig.js


export const RoleListConfig = {
  title: 'Manages Roles',
  fetchData: GetAllRoles,
  deleteData: DeleteRoleById,
  getId: (row,index) => row._id,
  actions : true,
  columns: [
    // { field:'srNo', headerName: 'Sr.No', width: 80 },
    { field: 'name', headerName: 'Role Name', flex: 1 }
  ],
  addButton: {
    label: 'Add Role',
    onClick: (navigate) => navigate('/dashboard/role/submit')
  },
  rowActions: (row, navigate, handleDelete) => [
    {
      label: 'Edit',
      color: 'info',
      type: 'edit',
      onClick: () => navigate(`/dashboard/role/submit/${row._id}`)
    },
    {
      label: 'Delete',
      color: 'error',
      type: 'delete',
      onClick: () => handleDelete(row._id)
    }
  ]
};

export default RoleFormConfig;

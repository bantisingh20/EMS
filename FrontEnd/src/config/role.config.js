// src/config/RoleFormConfig.js
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


export  const RoleListConfig = {
  title: 'Manage Roles',
  fetchFunction: GetAllRoles,
  deleteFunction: DeleteRoleById,
  addLabel: 'Add New Role',
  addUrl: '/dashboard/role/submit',
  editUrlBase: '/dashboard/role/submit',
  searchKeys: ['name'],
  columns: [
    { field: '_id', headerName: 'ID', width: 80, hide: true },
    { field: 'name', headerName: 'Role Name', flex: 1 },
    // You can add more columns here
  ],
  actionButtons: [
    {
      label: 'Edit',
      type: 'edit',
      condition: (user, row) => user.role === 'admin' || user.role === 'editor',
    },
    {
      label: 'Delete',
      type: 'delete',
      condition: (user) => user.role === 'admin',
    },
  ],
}; 

export default RoleFormConfig;

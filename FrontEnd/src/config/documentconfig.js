// export const DepartmentListConfig = {
//   title: 'Manage Document',
//   fetchData: '',
//   deleteData: '',
//   getId: (row) => row._id,
//   columns: [
//     { field: 'id', headerName: 'Sr.No', width: 80 },
//     { field: 'departmentname', headerName: 'Department Name', flex: 1 }
//   ],
//   addButton: {
//     label: 'Add Department',
//     onClick: (navigate) => navigate('/dashboard/save/department')
//   },
//   rowActions: (row, navigate, handleDelete) => [
//     {
//       label: 'Edit',
//       color: 'info',
//       onClick: () => navigate(`/dashboard/edit-department/${row._id}`)
//     },
//     {
//       label: 'Delete',
//       color: 'error',
//       onClick: () => handleDelete(row._id)
//     }
//   ]
// };
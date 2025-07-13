import { actions } from "react-table";
import { GetUserWiseLeaveData } from "../api/LeaveApi";

export const LeaveListConfig = {
  title: "Manage Leaves",
  fetchData: GetUserWiseLeaveData,

  getId: (row, index) => row._id,
  actions: false,
  columns: [
    { field: "id", headerName: "Sr.No", width: 80 },
    { field: "employeeName", headerName: "Employee Name", flex: 1 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "fromDate", headerName: "Start Date", flex: 1 },
    { field: "toDate", headerName: "To Date" },
    { field: "status", headerName: "Status" },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
       
    },
  ],
  //   addButton: {
  //     label: 'Add Role',
  //     onClick: (navigate) => navigate('/dashboard/role/submit')
  //   },
  //   rowActions: (row, navigate, handleDelete) => [
  //     {
  //       label: 'Edit',
  //       color: 'info',
  //       onClick: () => navigate(`/dashboard/role/submit/${row._id}`)
  //     },
  //     {
  //       label: 'Delete',
  //       color: 'error',
  //       onClick: () => handleDelete(row._id)
  //     }
  //   ]
};

// export const EmployeeFormConfig = (mode) => ({
//   mode,
//   initialValues: {
//     employeecode: '',
//     employeeid: 0,
//     firstname: '',
//     lastname: '',
//     emailid: '',
//     contactno: '',
//     dateofbith: '',
//     dateofJoining: '',
//     department: '0',
//     designation: '0',
//     password: '',
//     role: '0',
//   },
//   fields: [
//     { name: 'employeecode', label: 'Employee Code', type: 'text', validation: { required: true } },
//     { name: 'firstname', label: 'First Name', type: 'text', validation: { required: true } },
//     { name: 'lastname', label: 'Last Name', type: 'text', validation: { required: true } },
//     { name: 'emailid', label: 'Email', type: 'email', validation: { required: true } },
//     { name: 'contactno', label: 'Phone', type: 'text', validation: { required: true } },
//     { name: 'dateofbith', label: 'Date of Birth', type: 'date' },
//     { name: 'dateofJoining', label: 'Date of Joining', type: 'date' },
//     {
//       name: 'department',
//       label: 'Department',
//       type: 'select',
//       options: async () => {
//         const res = await GetAllDepartmentsNew();
//         return res.data.map((d) => ({ label: d.departmentname, value: d._id }));
//       },
//       validation: { required: true }
//     },
//     {
//       name: 'designation',
//       label: 'Designation',
//       type: 'select',
//       options: async () => {
//         const res = await GetAllDesignationsNew();
//         return res.data.map((d) => ({ label: d.designationname, value: d._id }));
//       },
//       validation: { required: true }
//     },
//     {
//       name: 'role',
//       label: 'Role',
//       type: 'select',
//       options: async () => {
//         const res = await GetAllRoles();
//         return res.data.map((g) => ({ label: g.name, value: g._id }));
//       },
//       validation: { required: true }
//     },
//     { name: 'password', label: 'Password', type: 'password', validation: { required: mode === 'create' } },
//   ],

//   fetchById: GetEmployeeById,
//   mapResponseToValues: (res) => ({
//     employeecode: res?.employeecode || '',
//     employeeid: res?.employeeid || 0,
//     firstname: res?.firstname || '',
//     lastname: res?.lastname || '',
//     emailid: res?.emailid || '',
//     contactno: res?.contactno || '',
//     dateofbith: res?.dateofbith?.split('T')[0] || '',
//     dateofJoining: res?.dateofJoining?.split('T')[0] || '',
//     department: res?.department || '0',
//     designation: res?.designation || '0',
//     role: res?.role || '0',
//     password: res?.originalpassword || '',
//   }),
//   createFunction: SaveUpdateEmployee,
//   updateFunction: UpdateEmployee,
//   redirectPath: '/dashboard/list-employee',
// });

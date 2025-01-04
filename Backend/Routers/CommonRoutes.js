
const { SaveLeave, GetLeaveDetails } = require('../Schemas/LeaveSchema.js');
const { SaveDepartment ,GetAllDepartments ,GetDepartmentByName ,GetDepartmentById,DeleteDepartment ,UpdateDepartment } = require('../Schemas/departmentSchema');

const {SaveDesignation ,GetAllDesignation, UpdateDesignation, DeleteDesignation} =require('../Schemas/designationSchema.js');
const { SaveEmployee,upload, GetAllEmployees ,GetEmployeesById, UpdateEmployee, DeleteEmployee } = require('../Schemas/employeesSchema.js');
const route = require('express').Router();
const {verifyuser } = require('../middleware/authmiddleware.js');

//#region Department Routes

route.post('/department/save-department',verifyuser,SaveDepartment)
route.get('/department/GetAllDepartment',verifyuser,GetAllDepartments);
route.get('/department/GetAllDepartmentByName',GetDepartmentByName);
route.get('/department/GetDepartmentById',GetDepartmentById);
route.post('/department/UpdateDepartment',UpdateDepartment);
route.delete('/department/deleteDepartmentByID/:id',DeleteDepartment);

//#endregion


route.post('/designation/save-designation',verifyuser,SaveDesignation);
route.get('/designation/GetAlldesignation',verifyuser,GetAllDesignation);
route.post('/designation/Update-designation',verifyuser,UpdateDesignation);
route.delete('/designation/DeletedesignationByID/:id',DeleteDesignation);

//#region Employee Routes

route.post('/employee/save-employee',verifyuser,upload.single('image'),SaveEmployee);
route.get('/employee/GetAllEmployees',verifyuser,GetAllEmployees);
route.put('/employee/UpdateEmployee/:id', verifyuser,UpdateEmployee);
route.get('/employee/GetEmployeesById/:id',GetEmployeesById);
route.delete('/employee/DeleteEmployee/:id',DeleteEmployee);
//#endregion


//route.post('/salary/save-salary',Save);

route.post('/leave/apply-leave',verifyuser,SaveLeave);
route.get('/leave/leave',verifyuser,GetLeaveDetails);
route.get('/leave/leavedashboard',verifyuser,GetLeaveDetails);

module.exports = route;


const { GetAllMenulist } = require('../../FrontEnd/src/api/MenuApi.js');
const { SaveMenu, GetParentMenu } = require('../Controllers/Menu.js');
const { SaveEmployeePunchIn, GetAttendeceDetails, SaveEmployeePunchOut } = require('../Schemas/AttendenceSchema.js');
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
route.get('/department/GetDepartmentById/:id',GetDepartmentById);
route.put('/department/UpdateDepartment',UpdateDepartment);
route.delete('/department/deleteDepartmentByID/:id',DeleteDepartment);

//#endregion


route.post('/designation/save-designation',verifyuser,SaveDesignation);
/**
 * @swagger
 * /designation/GetAlldesignation:
 *   get:
 *     --summary: Get all Designation
 *     responses:
 *       200:
 *         description: List of all Designation
 */
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

//Attendence


/**
 * @swagger
 * /attendence/Employee-Punch-In:
 *   post:
 *     summary: Save Employee Punch In - Out
 *     tags:
 *       - Attendence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: in or out
 *     responses:
 *       200:
 *         description: Successfully punch in
 */
 
route.post('/attendence/Employee-Punch-In',verifyuser,SaveEmployeePunchIn)
route.post('/attendence/Employee-Punch-Out',verifyuser,SaveEmployeePunchOut)
route.get('/attendence/GetAttendenceData',verifyuser,GetAttendeceDetails)

//menu route
route.post('/menu/add-new-menu',SaveMenu)
route.get('/menu/get-menu',GetParentMenu)
route.get('/Role/Assign-Role-To-Employee',GetAllMenulist);

module.exports = route;

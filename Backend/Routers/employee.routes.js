const EmployeeController = require('../Controllers/employees.controller');
const express = require('express');
const route = express.Router();
const { upload} = require('../Schemas/employeesSchema.js');

route.post('/save-employee',upload.single('image'),EmployeeController.SaveEmployee);
route.get('/get-employees',EmployeeController.GetAllEmployees);
route.put('/UpdateEmployee/:id', EmployeeController.UpdateEmployee);
route.get('/GetEmployeesById/:id',EmployeeController.GetEmployeesById);
route.delete('/DeleteEmployee/:id',EmployeeController.DeleteEmployee);


module.exports = route;
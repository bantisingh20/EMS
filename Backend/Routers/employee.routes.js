const EmployeeController = require('../Controllers/employees.controller');
const express = require('express');
const route = express.Router();
const { upload} = require('../models/employee.model.js');

route.post('/save-employees',upload.single('image'),EmployeeController.SaveEmployee);
route.get('/get-employees',EmployeeController.GetAllEmployees);
route.put('/UpdateEmployee/', EmployeeController.UpdateEmployee);
route.get('/GetEmployeesById/:id',EmployeeController.GetEmployeesById);
route.delete('/DeleteEmployee/:id',EmployeeController.DeleteEmployee);


module.exports = route;
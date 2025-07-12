const DepartmentController = require('../Controllers/department.controller');
const route = require('express').Router();


route.post('/save-department',DepartmentController.SaveDepartment)
route.get('/GetAllDepartment',DepartmentController.GetAllDepartments);
route.get('/GetAllDepartmentByName',DepartmentController.GetDepartmentByName);
route.get('/GetDepartmentById/:id',DepartmentController.GetDepartmentById);
route.put('/UpdateDepartment',DepartmentController.UpdateDepartment);
route.delete('/deleteDepartmentByID/:id',DepartmentController.DeleteDepartment);


module.exports = route;
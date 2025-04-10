const express = require('express');
const router = express.Router();
const AuthRouter = require('./Auth.routes');
const { verifyuser } = require('../MiddleWare/authhentication');
const { SaveDepartment, GetAllDepartment, GetDepartmentById, UpdateDepartment, DeleteDepartment } = require('../Controllers/department.controller');
const { SaveDesignation, GetAllDesignation, GetDesignationById, UpdateDesignation, DeleteDesignation } = require('../Controllers/designation.controller');

 
router.use('/auth', AuthRouter);

//Department
router.post('/department/save-department',verifyuser,SaveDepartment)
router.get('/department/GetAllDepartment',verifyuser,GetAllDepartment);
router.get('/department/GetDepartmentById/:id',GetDepartmentById);
router.put('/department/UpdateDepartment',UpdateDepartment);
router.delete('/department/deleteDepartmentByID/:id',DeleteDepartment);

// Designation
router.post('/designation/save-designation',verifyuser,SaveDesignation)
router.get('/designation/GetAlldesignation',verifyuser,GetAllDesignation);
router.get('/designation/GetDesignationById/:id',GetDesignationById);
router.put('/designation/Updatedesignation',UpdateDesignation);
router.delete('/designation/deleteDesignationByID/:id',DeleteDesignation);


//Employees
router.post('/employees/save-employees',verifyuser,SaveDesignation)
module.exports = router;
const express = require('express');
const router = express.Router();
const { SaveDepartment,GetAllDepartment,GetDepartmentById,UpdateDepartment,DeleteDepartment } = require('../Controllers/department.controller');
const { verifyuser } = require('../MiddleWare/authhentication');
 
//router.get('/', getUsers);


router.post('/save-department',verifyuser,SaveDepartment)
router.get('/GetAllDepartment',verifyuser,GetAllDepartment);
router.get('/GetDepartmentById/:id',GetDepartmentById);
router.put('/UpdateDepartment',UpdateDepartment);
router.delete('/deleteDepartmentByID/:id',DeleteDepartment);
module.exports = router;
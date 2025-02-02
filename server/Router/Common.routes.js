const express = require('express');
const router = express.Router();
const AuthRouter = require('./Auth.routes');
const { verifyuser } = require('../MiddleWare/authhentication');
const { SaveDepartment, GetAllDepartment } = require('../Controllers/department.controller');

 
router.use('/auth', AuthRouter);

router.post('/department/save-department',verifyuser,SaveDepartment)
router.get('/department/GetAllDepartment',verifyuser,GetAllDepartment);
// route.get('/department/GetDepartmentById/:id',GetDepartmentById);
// route.put('/department/UpdateDepartment',UpdateDepartment);
// route.delete('/department/deleteDepartmentByID/:id',DeleteDepartment);

module.exports = router;
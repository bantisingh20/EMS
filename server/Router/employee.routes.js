const express = require('express');
const router = express.Router(); 
const { verifyuser } = require('../MiddleWare/authhentication');
const { SaveUser, GetAllEmployee } = require('../Controllers/user.controller'); 
 
//router.get('/', getUsers);


router.post('/save-employees',verifyuser,SaveUser)
router.get('/get-employees',verifyuser,GetAllEmployee);
// router.get('/GetDepartmentById/:id',GetDepartmentById);
// router.put('/UpdateDepartment',UpdateDepartment);
// router.delete('/deleteDepartmentByID/:id',DeleteDepartment);
module.exports = router;
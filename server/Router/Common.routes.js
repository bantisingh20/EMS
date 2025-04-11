const express = require('express');
const router = express.Router();
const AuthRouter = require('./Auth.routes');
const departmentRoutes = require('./department.routes');
const designationRoutes = require('./designation.routes');
const employeeRoutes = require('./employee.routes');
const { verifyuser } = require('../MiddleWare/authhentication');
 
router.use('/auth', AuthRouter);
router.use('/department', departmentRoutes);
router.use('/designation', designationRoutes);
router.use('/employees',employeeRoutes)   
//router.post('/employees/save-employees',verifyuser,SaveDesignation)
module.exports = router;
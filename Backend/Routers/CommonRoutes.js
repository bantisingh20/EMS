
const route = require('express').Router();
//const {verifyuser } = require('../middleware/authmiddleware.js');

// Department Routes
route.use('/department', require('./department.routes.js')); // Apply verifyuser middleware to all department routes
route.use('/designation',  require('./designation.routes.js')); // Designation routes
route.use('/employees',  require('./employee.routes.js')); // Employee routes
route.use('/role', require('./roles.routes.js')); // Roles routes
//route.use('/salary', verifyuser, require('./salary.routes.js')); // Salary routes

module.exports = route;

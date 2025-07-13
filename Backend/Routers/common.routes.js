
const route = require('express').Router(); 
 
route.use('/department', require('./department.routes.js'));  
route.use('/designation',  require('./designation.routes.js'));  
route.use('/employees',  require('./employee.routes.js'));  
route.use('/role', require('./roles.routes.js'));  
route.use('/document', require('./document.routes.js'));
route.use('/attendence', require('./attendence.routes.js'));
route.use('/leave', require('./leave.routes.js'));
module.exports = route;


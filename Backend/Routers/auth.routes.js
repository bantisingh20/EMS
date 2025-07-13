const { Login, verify } = require('../Controllers/auth.controller.js');
const route = require('express').Router(); 
const {verifyuser } = require('../middleware/authmiddleware.js');
const { SaveMenu } = require('../Controllers/menu.controller.js'); // Importing SaveMenu controller 

route.post('/login', Login); // Using the Login controller to handle the logic
route.get('/verify-user', verifyuser ,verify) // check user session verification
//route.post('/save-user',SaveUser); // save new users
route.post('/savemenu',SaveMenu); // save new menu
module.exports = route;

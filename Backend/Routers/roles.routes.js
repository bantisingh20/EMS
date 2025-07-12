const RolesController = require('../Controllers/roles.controller');
const route = require('express').Router();


route.post('/save-role',RolesController.SaveRole)
route.get('/GetAllRoles',RolesController.GetAllRoles);
route.get('/GetRolesById/:id',RolesController.GetRoleById);
route.put('/UpdateRole',RolesController.UpdateRole);
route.delete('/deleteRoleById/:id',RolesController.DeleteRole);


module.exports = route;
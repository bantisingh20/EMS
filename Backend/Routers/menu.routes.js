const express = require('express');
const route = express.Router();
const MenuController = require('../Controllers/menu.controller');
const RoleWiseRightsController = require('../Controllers/roleWiseRights.controller');

// Menu Routes
route.post('/save-menu', MenuController.SaveMenu);                   // Create new menu
route.get('/get-menus', MenuController.GetAllMenus);                 // Get all menus
route.get('/get-menu-by-id/:id', MenuController.GetMenuById);        // Get menu by ID
route.put('/update-menu/:id', MenuController.UpdateMenu);            // Update menu by ID
route.delete('/delete-menu/:id', MenuController.DeleteMenu);         // Delete menu by ID

// RoleWiseRights Routes
route.post('/save-role-wise-rights', RoleWiseRightsController.SaveRoleWiseRights);  // Save rights for role and menu
route.get('/get-role-wise-rights', RoleWiseRightsController.GetAllRoleWiseRights);  // Get all role-based rights
route.get('/get-role-wise-rights-by-role/:role', RoleWiseRightsController.GetRoleWiseRightsByRole); // Get rights for specific role
route.put('/update-role-wise-rights/:id', RoleWiseRightsController.UpdateRoleWiseRights); // Update rights by ID
route.delete('/delete-role-wise-rights/:id', RoleWiseRightsController.DeleteRoleWiseRights); // Delete role-wise rights by ID

module.exports = route;

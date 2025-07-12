const DesignationController = require('../Controllers/designation.controller');
const express = require('express');
const route = express.Router();

route.post('/save-designation',DesignationController.SaveDesignation);
route.get('/GetAlldesignation', DesignationController.GetAllDesignation);
route.put('/Updatedesignation', DesignationController.UpdateDesignation);
route.delete('/DeletedesignationByID/:id', DesignationController.DeleteDesignation);
route.get('/GetDesignationById/:id', DesignationController.GetDesignationById);


module.exports = route;
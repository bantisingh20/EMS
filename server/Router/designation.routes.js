const express = require('express');
const router = express.Router(); 
const { verifyuser } = require('../MiddleWare/authhentication');
const { SaveDesignation, GetAllDesignation, GetDesignationById, UpdateDesignation, DeleteDesignation } = require('../Controllers/designation.controller');
    
router.post('/save-designation',verifyuser,SaveDesignation)
router.get('/GetAlldesignation',verifyuser,GetAllDesignation);
router.get('/GetDesignationById/:id',GetDesignationById);
router.put('/Updatedesignation',UpdateDesignation);
router.delete('/deleteDesignationByID/:id',DeleteDesignation);
module.exports = router;
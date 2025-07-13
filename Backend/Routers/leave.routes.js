const express = require('express');
const router = express.Router();
const leaveController = require('../Controllers/leave.controller');
router.post('/apply-leave', leaveController.SaveLeave); // Save a new leave request
router.get('/Get-all-leave-details', leaveController.GetLeaveDetails); // Get leave details for the logged-in

module.exports = router;
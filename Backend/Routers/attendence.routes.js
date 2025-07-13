const express = require("express");
const route = express.Router();

route.post("/punch-in", require("../Controllers/attendence.controller").SaveEmployeePunchIn);
route.post("/punch-out", require("../Controllers/attendence.controller").SaveEmployeePunchOut);
route.get("/attendance-details", require("../Controllers/attendence.controller").getAttendanceByEmployee);
// router.get("/punch-in", require("../Controllers/attendence.controller").GetAttendeceDetails);
// router.post("/punch-out", require("../Controllers/attendence.controller").SaveEmployeePunchOut);
// router.get("/punch-out", require("../Controllers/attendence.controller").GetPunchOutDetails); 
module.exports = route;
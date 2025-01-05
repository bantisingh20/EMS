const { Login, verify } = require('../Controllers/Controllers');
const { SaveDepartment ,GetAllDepartments ,SearchDepartments } = require('../Schemas/departmentSchema');
const route = require('express').Router();
const {SaveUser} = require("../Schemas/user");
const {verifyuser } = require('../middleware/authmiddleware.js');


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


route.post('/login', Login); // Using the Login controller to handle the logic
route.get('/verify-user', verifyuser ,verify) // check user session verification
route.post('/save-user',SaveUser); // save new users

module.exports = route;

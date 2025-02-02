const express = require('express');
const router = express.Router();
const {login} = require('../Controllers/login');
const { verifyuser,verify } = require('../MiddleWare/authhentication');

router.post('/login',login);
router.get('/verify-user',verifyuser,verify);
module.exports = router;
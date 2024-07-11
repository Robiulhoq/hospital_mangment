const express = require('express');
const { rigister, login, authenticateToken } = require('../Controllers/authControllers.js');
const router = express.Router();

router.post('/rigister', rigister);
router.post('/login', login);
router.get('/token', authenticateToken);



module.exports = router
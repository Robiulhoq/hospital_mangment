const express = require('express');
const { rigister, login } = require('../Controllers/authControllers.js');
const router = express.Router();

router.post('/rigister', rigister);
router.post('/login', login);



module.exports = router
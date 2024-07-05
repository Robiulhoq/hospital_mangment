const express = require('express');
const { createCaseStydy, getAllCaseStudy } = require('../Controllers/addCaseStudyControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/:id', verifyToken, createCaseStydy);
router.get('/', verifyToken, getAllCaseStudy);


module.exports = router
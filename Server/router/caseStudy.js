const express = require('express');
const { createCaseStydy, getAllCaseStudy } = require('../Controllers/addCaseStudyControllers.js');
const router = express.Router();

router.post('/:id', createCaseStydy);
router.get('/', getAllCaseStudy);


module.exports = router
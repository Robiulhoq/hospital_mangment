const express = require('express');
const { createdLabreport, putLabreport, deleteLabreport, getAllLabreport } = require('../Controllers/LabReportController.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdLabreport);
router.put('/:id',verifyToken, putLabreport);
router.delete('/:id',verifyToken, deleteLabreport);
router.get('/',verifyToken, getAllLabreport);

module.exports = router
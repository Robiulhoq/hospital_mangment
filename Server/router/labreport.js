const express = require('express');
const { createdLabreport, putLabreport, deleteLabreport, getAllLabreport } = require('../Controllers/LabReportController.js');
const router = express.Router();

router.post('/', createdLabreport);
router.put('/:id', putLabreport);
router.delete('/:id', deleteLabreport);
router.get('/', getAllLabreport);

module.exports = router
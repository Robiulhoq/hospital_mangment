const express = require('express');
const { createdPatient, putPatient, deletePatient, getAllPatient } = require('../Controllers/patientControllers.js');
const router = express.Router();

router.post('/', createdPatient);
router.put('/:id', putPatient);
router.delete('/:id', deletePatient);
router.get('/', getAllPatient);

module.exports = router
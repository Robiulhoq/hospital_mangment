const express = require('express');
const { createdPatient, putPatient, deletePatient, getAllPatient, createAppointment, deleteAppoinment, getOnePatient } = require('../Controllers/patientControllers.js');
const router = express.Router();

router.post('/', createdPatient);
router.put('/:id', putPatient);
router.delete('/:id', deletePatient);
router.get('/', getAllPatient);
router.get('/filter/:id', getOnePatient);

router.post('/appoinment/:id', createAppointment)
router.delete('/appoinment/:id/:appoinmentId', deleteAppoinment)

module.exports = router
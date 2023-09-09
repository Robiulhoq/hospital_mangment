const express = require('express');
const { createdPatient, putPatient, deletePatient, getAllPatient, createAppointment, deleteAppoinment, getOnePatient } = require('../Controllers/patientControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdPatient);
router.put('/:id',verifyToken, putPatient);
router.delete('/:id',verifyToken, deletePatient);
router.get('/',verifyToken, getAllPatient);
router.get('/filter/:id',verifyToken, getOnePatient);

router.post('/appoinment/:id',verifyToken, createAppointment)
router.delete('/appoinment/:id/:appoinmentId',verifyToken, deleteAppoinment)

module.exports = router
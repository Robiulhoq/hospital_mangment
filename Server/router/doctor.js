const express = require('express');
const { createdDoctor, putDoctor, deleteDoctor, getAllDoctor, createdSchedule, putSchedule, deleteSchedule } = require('../Controllers/DoctorControllers.js');
const router = express.Router();

router.post('/', createdDoctor);
router.put('/:id', putDoctor);
router.delete('/:id', deleteDoctor);
router.get('/', getAllDoctor);

router.post('/schedule/:id' , createdSchedule);
router.put('/schedule/:id/:scheduleId', putSchedule)
router.delete('/schedule/:id/:scheduleId', deleteSchedule)

module.exports = router
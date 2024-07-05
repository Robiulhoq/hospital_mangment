const express = require('express');
const { createdDoctor, putDoctor, deleteDoctor, getAllDoctor, createdSchedule, putSchedule, deleteSchedule } = require('../Controllers/DoctorControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdDoctor);
router.put('/:id',verifyToken, putDoctor);
router.delete('/:id', verifyToken, deleteDoctor);
router.get('/', verifyToken, getAllDoctor);

router.post('/schedule/:id' , verifyToken, createdSchedule);
router.put('/schedule/:id/:scheduleId', verifyToken, putSchedule)
router.delete('/schedule/:id/:scheduleId', verifyToken,deleteSchedule)

module.exports = router;
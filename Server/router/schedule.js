const express = require('express');
const { createdSchedule, putSchedule, deleteSchedule, getAllSchedule } = require('../Controllers/scheduleControllers.js');
const router = express.Router();

router.post('/', createdSchedule);
router.put('/:id', putSchedule);
router.delete('/:id', deleteSchedule);
router.get('/', getAllSchedule);

module.exports = router
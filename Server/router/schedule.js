const express = require('express');
const { createdSchedule, putSchedule, deleteSchedule, getAllSchedule } = require('../Controllers/scheduleControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/',verifyToken, createdSchedule);
router.put('/:id',verifyToken, putSchedule);
router.delete('/:id',verifyToken, deleteSchedule);
router.get('/',verifyToken, getAllSchedule);

module.exports = router
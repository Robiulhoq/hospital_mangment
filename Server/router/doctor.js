const express = require('express');
const { createdDoctor, putDoctor, deleteDoctor, getAllDoctor } = require('../Controllers/DoctorControllers.js');
const router = express.Router();

router.post('/', createdDoctor);
router.put('/:id', putDoctor);
router.delete('/:id', deleteDoctor);
router.get('/', getAllDoctor);

module.exports = router
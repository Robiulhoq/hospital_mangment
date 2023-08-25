const express = require('express');
const { createdDoctor, putDoctor, deleteDoctor, getAllDoctor, pushDoctor } = require('../Controllers/DoctorControllers.js');
const router = express.Router();

router.post('/', createdDoctor);
router.put('/:id', putDoctor);
router.delete('/:id', deleteDoctor);
router.get('/', getAllDoctor);
router.post('/schedule/:id' , pushDoctor);

module.exports = router
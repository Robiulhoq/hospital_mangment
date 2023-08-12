const express = require('express');
const { createdAppoinment, putAppoinment, deleteAppoinment, getAllAppoinment } = require('../Controllers/appoinmentControllers.js');
const router = express.Router();

router.post('/', createdAppoinment);
router.put('/:id', putAppoinment);
router.delete('/:id', deleteAppoinment);
router.get('/', getAllAppoinment);

module.exports = router
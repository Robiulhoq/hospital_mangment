const express = require('express');
const { createdPrescription, putPrescription, deletePrescription, getAllPrescription } = require('../Controllers/prescriptionControllers.js');
const router = express.Router();

router.post('/', createdPrescription);
router.put('/:id', putPrescription);
router.delete('/:id', deletePrescription);
router.get('/', getAllPrescription);

module.exports = router
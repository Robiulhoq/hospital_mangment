const express = require('express');
const { createdPrescription, putPrescription, deletePrescription, getAllPrescription, getPrescription } = require('../Controllers/prescriptionControllers.js');
const router = express.Router();

router.post('/:id', createdPrescription);
router.put('/:id', putPrescription);
router.delete('/:id', deletePrescription);
// router.get('/', getAllPrescription);
router.get('/:id', getPrescription);

module.exports = router
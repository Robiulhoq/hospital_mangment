const express = require('express');
const { createdPrescription, putPrescription, deletePrescription, getAllPrescription, getPrescription } = require('../Controllers/prescriptionControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/:id',verifyToken, createdPrescription);
router.put('/:id',verifyToken, putPrescription);
router.delete('/:id',verifyToken, deletePrescription);
// router.get('/', getAllPrescription);
router.get('/:id',verifyToken, getPrescription);

module.exports = router
const express = require('express');
const { createdMedicine, putMedicine, deleteMedicine, getAllMedicine } = require('../Controllers/medicineControllers.js');
const router = express.Router();

router.post('/', createdMedicine);
router.put('/:id', putMedicine);
router.delete('/:id', deleteMedicine);
router.get('/', getAllMedicine);

module.exports = router
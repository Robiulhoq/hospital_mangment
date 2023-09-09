const express = require('express');
const { createdMedicine, putMedicine, deleteMedicine, getAllMedicine } = require('../Controllers/medicineControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdMedicine);
router.put('/:id',verifyToken, putMedicine);
router.delete('/:id',verifyToken, deleteMedicine);
router.get('/',verifyToken, getAllMedicine);

module.exports = router
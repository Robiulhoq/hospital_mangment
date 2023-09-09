const express = require('express');
const { createdPayment, putPayment, deletePayment, getAllPayment } = require('../Controllers/paymentControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/',verifyToken, createdPayment);
router.put('/:id',verifyToken, putPayment);
router.delete('/:id',verifyToken, deletePayment);
router.get('/',verifyToken, getAllPayment);

module.exports = router
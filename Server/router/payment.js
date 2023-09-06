const express = require('express');
const { createdPayment, putPayment, deletePayment, getAllPayment } = require('../Controllers/paymentControllers.js');
const router = express.Router();

router.post('/', createdPayment);
router.put('/:id', putPayment);
router.delete('/:id', deletePayment);
router.get('/', getAllPayment);

module.exports = router
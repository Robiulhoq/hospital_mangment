const express = require('express');
const { createdInvoice, putInvoice, deleteInvoice, getAllInvoice, getOneInvoice } = require('../Controllers/invoiceControllers.js')
const router = express.Router();

router.post('/', createdInvoice);
router.put('/:id', putInvoice);
router.delete('/:id', deleteInvoice);
router.get('/', getAllInvoice);

router.get('/filter/:id', getOneInvoice);

module.exports = router
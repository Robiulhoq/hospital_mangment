const express = require('express');
const { createdInvoice, putInvoice, deleteInvoice, getAllInvoice, getOneInvoice } = require('../Controllers/invoiceControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/',verifyToken, createdInvoice);
router.put('/:id',verifyToken, putInvoice);
router.delete('/:id',verifyToken, deleteInvoice);
router.get('/',verifyToken, getAllInvoice);

router.get('/filter/:id',verifyToken, getOneInvoice);

module.exports = router
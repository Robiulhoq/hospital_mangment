const express = require('express');
const { createdPDocument, putPDocument, deletePDocument, getAllPDocument } = require('../Controllers/pAddDocumentControllers');
const { verifyToken } = require('../utils/VerifyToken');
const router = express.Router();

router.post('/',verifyToken, createdPDocument);
router.put('/:id',verifyToken, putPDocument);
router.delete('/:id',verifyToken, deletePDocument);
router.get('/',verifyToken, getAllPDocument);

module.exports = router
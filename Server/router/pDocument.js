const express = require('express');
const { createdPDocument, putPDocument, deletePDocument, getAllPDocument } = require('../Controllers/pAddDocumentControllers');
const router = express.Router();

router.post('/', createdPDocument);
router.put('/:id', putPDocument);
router.delete('/:id', deletePDocument);
router.get('/', getAllPDocument);

module.exports = router
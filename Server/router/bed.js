const express = require('express');
const { createdBed, putBed, deleteBed, getAllBed } = require('../Controllers/bedControllers.js');
const router = express.Router();

router.post('/', createdBed);
router.put('/:id', putBed);
router.delete('/:id', deleteBed);
router.get('/', getAllBed);

module.exports = router
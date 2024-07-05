const express = require('express');
const { createdBed, putBed, deleteBed, getAllBed } = require('../Controllers/bedControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdBed);
router.put('/:id', verifyToken, putBed);
router.delete('/:id', verifyToken, deleteBed);
router.get('/', verifyToken, getAllBed);

module.exports = router
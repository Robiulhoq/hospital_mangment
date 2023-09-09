const express = require('express');
const { createdAppoinment, putAppoinment, deleteAppoinment, getAllAppoinment } = require('../Controllers/appoinmentControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdAppoinment);
router.put('/:id', verifyToken, putAppoinment);
router.delete('/:id', verifyToken, deleteAppoinment);
router.get('/', verifyToken, getAllAppoinment);

module.exports = router
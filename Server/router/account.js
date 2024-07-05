const express = require('express');
const { createdAccount, putAccount, deleteAccount, getAllAccount } = require('../Controllers/addAccountControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdAccount);
router.put('/:id',verifyToken, putAccount);
router.delete('/:id', verifyToken, deleteAccount);
router.get('/', verifyToken, getAllAccount);

module.exports = router
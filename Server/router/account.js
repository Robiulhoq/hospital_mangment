const express = require('express');
const { createdAccount, putAccount, deleteAccount, getAllAccount } = require('../Controllers/addAccountControllers.js');
const router = express.Router();

router.post('/', createdAccount);
router.put('/:id', putAccount);
router.delete('/:id', deleteAccount);
router.get('/', getAllAccount);

module.exports = router
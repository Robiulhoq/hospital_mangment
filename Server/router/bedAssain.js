const express = require('express');
const { createdBedAssain, putBedAssain, deleteBedAssain, getAllBedAssain } = require('../Controllers/bedAssainControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/',verifyToken, createdBedAssain);
router.put('/:id', verifyToken, putBedAssain);
router.delete('/:id', verifyToken, deleteBedAssain);
router.get('/', verifyToken, getAllBedAssain);

module.exports = router
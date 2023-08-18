const express = require('express');
const { createdBedAssain, putBedAssain, deleteBedAssain, getAllBedAssain } = require('../Controllers/bedAssainControllers.js');
const router = express.Router();

router.post('/', createdBedAssain);
router.put('/:id', putBedAssain);
router.delete('/:id', deleteBedAssain);
router.get('/', getAllBedAssain);

module.exports = router
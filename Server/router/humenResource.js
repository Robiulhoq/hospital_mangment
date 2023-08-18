const express = require('express');
const { createdHumenResource, putHumenResource, deleteHumenResource, getAllHumenResource } = require('../Controllers/humenResourceControllers.js');
const router = express.Router();

router.post('/', createdHumenResource);
router.put('/:id', putHumenResource);
router.delete('/:id', deleteHumenResource);
router.get('/', getAllHumenResource);

module.exports = router
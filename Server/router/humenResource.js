const express = require('express');
const { createdHumenResource, putHumenResource, deleteHumenResource, getAllHumenResource } = require('../Controllers/humenResourceControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdHumenResource);
router.put('/:id',verifyToken, putHumenResource);
router.delete('/:id',verifyToken, deleteHumenResource);
router.get('/',verifyToken, getAllHumenResource);

module.exports = router
const express = require('express');
const { createdDepartment, putDepartment, deleteDepartment, getAllDepartment } = require('../Controllers/departmentControllers.js');
const { verifyToken } = require('../utils/VerifyToken.js');
const router = express.Router();

router.post('/', verifyToken, createdDepartment);
router.put('/:id', verifyToken, putDepartment);
router.delete('/:id', verifyToken, deleteDepartment);
router.get('/', verifyToken, getAllDepartment);

module.exports = router
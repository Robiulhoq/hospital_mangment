const express = require('express');
const { createdDepartment, putDepartment, deleteDepartment, getAllDepartment } = require('../Controllers/departmentControllers.js');
const router = express.Router();

router.post('/', createdDepartment);
router.put('/:id', putDepartment);
router.delete('/:id', deleteDepartment);
router.get('/', getAllDepartment);

module.exports = router
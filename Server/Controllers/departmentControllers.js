const mongoose = require('mongoose');
const DepartmentSchema = require('../Schema/DepartmentSchema.js');
const Department = mongoose.model("Department", DepartmentSchema);
const createError = require('../utils/error.js');

const createdDepartment = async (req, res, next) => {
    const newDepartment = new Department(req.body);
    try {
        const savedDepartment = await newDepartment.save();
        res.status(200).json(savedDepartment);
    } catch (error){
        next(error)
    }
}

const putDepartment = async (req, res, next) =>{
    try {
        const updateDepartment = await Department.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateDepartment)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteDepartment = async (req, res, next) =>{
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.status(200).json("Department has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllDepartment = async (req, res, next) =>{
    try {
        const Departments = await Department.find();
          res.status(200).json(Departments)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdDepartment, putDepartment, deleteDepartment, getAllDepartment, Department};
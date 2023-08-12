const mongoose = require('mongoose');
const PatientSchema = require('../Schema/PatientSchema.js');
const Patient = mongoose.model("Patient", PatientSchema);
const createError = require('../utils/error.js');

const createdPatient = async (req, res, next) => {
    const newPatient = new Patient(req.body);
    try {
        const savedPatient = await newPatient.save();
        res.status(200).json(savedPatient);
    } catch (error){
        next(error)
    }
}

const putPatient = async (req, res, next) =>{
    try {
        const updatePatient = await Patient.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updatePatient)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deletePatient = async (req, res, next) =>{
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json("Patient has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllPatient = async (req, res, next) =>{
    try {
        const Patients = await Patient.find();
          res.status(200).json(Patients)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdPatient, putPatient, deletePatient, getAllPatient, Patient};
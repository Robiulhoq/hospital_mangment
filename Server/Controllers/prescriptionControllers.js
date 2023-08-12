const mongoose = require('mongoose');
const PrescriptionSchema = require('../Schema/PrescriptionSchema.js');
const Prescription = mongoose.model("Prescription", PrescriptionSchema);
const createError = require('../utils/error.js');

const createdPrescription = async (req, res, next) => {
    const newPrescription = new Prescription(req.body);
    try {
        const savedPrescription = await newPrescription.save();
        res.status(200).json(savedPrescription);
    } catch (error){
        next(error)
    }
}

const putPrescription = async (req, res, next) =>{
    try {
        const updatePrescription = await Prescription.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updatePrescription)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deletePrescription = async (req, res, next) =>{
    try {
        await Prescription.findByIdAndDelete(req.params.id);
        res.status(200).json("Prescription has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllPrescription = async (req, res, next) =>{
    try {
        const Prescriptions = await Prescription.find();
          res.status(200).json(Prescriptions)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdPrescription, putPrescription, deletePrescription, getAllPrescription, Prescription};
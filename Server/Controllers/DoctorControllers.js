const mongoose = require('mongoose');
const DoctorSchema = require('../Schema/DoctorSchema.js');
const Doctor = mongoose.model("Doctor", DoctorSchema);
const createError = require('../utils/error.js');

const createdDoctor = async (req, res, next) => {
    const newDoctor = new Doctor(req.body);
    try {
        const savedDoctor = await newDoctor.save();
        res.status(200).json(savedDoctor);
    } catch (error){
        next(error)
    }
}

const putDoctor = async (req, res, next) =>{
    try {
        const updateDoctor = await Doctor.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateDoctor)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteDoctor = async (req, res, next) =>{
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json("Doctor has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllDoctor = async (req, res, next) =>{
    try {
        const Doctors = await Doctor.find();
          res.status(200).json(Doctors)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdDoctor, putDoctor, deleteDoctor, getAllDoctor, Doctor};
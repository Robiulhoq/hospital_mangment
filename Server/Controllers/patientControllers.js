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
const getOnePatient = async (req, res, next) =>{
    const patientId = req.params.id;
    try {
        const Patients = await Patient.find({_id: patientId});
        if(!Patients){
            return res.status(404).json({ message: 'Patient not found for the provided patientId' });
        }
          res.status(200).json(Patients)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}
// Patient appoinment API start

const createAppointment = async (req, res, next) => {
    const patientId = req.params.id;
    try {
        const updatedPatient = await Patient.findOneAndUpdate(
            { _id: patientId },
            {
                $push: {
                    appoinment: req.body
                }
            },
            { new: true }
        );
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

const deleteAppoinment = async (req, res, next) => {
    const patientId = req.params.id;
    const appoinmentId = req.params.appoinmentId; // Assuming you pass scheduleId in the URL
    
    try {
        const updateAppoinment = await Patient.findOneAndUpdate(
            { _id: patientId },
            {
                $pull: {
                    appoinment: { _id: appoinmentId } // Remove the matching schedule from the array
                }
            },
            { new: true }
        );

        if (!updateAppoinment) {
            return res.status(404).json({ error: "Appoinment not found" });
        }

        res.status(200).json(updateAppoinment);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

module.exports = {createdPatient, putPatient, deletePatient, getAllPatient, createAppointment, deleteAppoinment, getOnePatient, Patient};
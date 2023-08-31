const mongoose = require('mongoose');
const PrescriptionSchema = require('../Schema/PrescriptionSchema.js');
const Prescription = mongoose.model("Prescription", PrescriptionSchema);
const { Patient } = require('../Controllers/patientControllers.js');
const createError = require('../utils/error.js');

const createdPrescription = async (req, res, next) => {
    const patientId = req.params.id;
    const data = req.body; // Assuming req.body contains your array of data
    
    try {
        const savedPrescription = await Prescription.create({
            patientId: patientId,
            prescriptions: data.filter(item => item.medicineName || item.medicineType || item.instruction || item.day),
            diagnoses: data.filter(item => item.diagnosis || item.instruction)
        });
        try {
            await Patient.findOneAndUpdate({ _id: patientId }, {
                $push:{
                    prescription: savedPrescription._id
                }
            })

            res.status(200).json(savedPrescription);
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error);
    }
};

const putPrescription = async (req, res, next) => {
    try {
        const updatePrescription = await Prescription.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updatePrescription)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

}

const deletePrescription = async (req, res, next) => {
    try {
        await Prescription.findByIdAndDelete(req.params.id);
        res.status(200).json("Prescription has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllPrescription = async (req, res, next) => {
    try {
        const Prescriptions = await Prescription.find();
        res.status(200).json(Prescriptions)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getPrescription = async (req, res, next) => {
    const patientId = req.params.id; // Assuming the parameter is named "patientId"

    try {
        const prescription = await Prescription.find({ patientId: patientId });

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found for the provided patientId' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        next(error);
    }
};
module.exports = { createdPrescription, putPrescription, deletePrescription, getAllPrescription, getPrescription, Prescription };
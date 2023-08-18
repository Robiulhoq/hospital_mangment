const mongoose = require('mongoose');
const MedicineSchema = require('../Schema/MedicineSchema.js');
const Medicine = mongoose.model("Medicine", MedicineSchema);
const createError = require('../utils/error.js');

const createdMedicine = async (req, res, next) => {
    const newMedicine = new Medicine(req.body);
    try {
        const savedMedicine = await newMedicine.save();
        res.status(200).json(savedMedicine);
    } catch (error){
        next(error)
    }
}

const putMedicine = async (req, res, next) =>{
    try {
        const updateMedicine = await Medicine.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateMedicine)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteMedicine = async (req, res, next) =>{
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.status(200).json("Medicine has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllMedicine = async (req, res, next) =>{
    try {
        const Medicines = await Medicine.find();
          res.status(200).json(Medicines)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdMedicine, putMedicine, deleteMedicine, getAllMedicine, Medicine};
const mongoose = require('mongoose');
const AppoinmentSchema = require('../Schema/AppoinmentSchema.js');
const Appoinment = mongoose.model("Appoinment", AppoinmentSchema);
const createError = require('../utils/error.js');

const createdAppoinment = async (req, res, next) => {
    const newAppoinment = new Appoinment(req.body);
    try {
        const savedAppoinment = await newAppoinment.save();
        res.status(200).json(savedAppoinment);
    } catch (error){
        next(error)
    }
}

const putAppoinment = async (req, res, next) =>{
    try {
        const updateAppoinment = await Appoinment.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateAppoinment)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteAppoinment = async (req, res, next) =>{
    try {
        await Appoinment.findByIdAndDelete(req.params.id);
        res.status(200).json("Appoinment has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllAppoinment = async (req, res, next) =>{
    try {
        const Appoinments = await Appoinment.find();
          res.status(200).json(Appoinments)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdAppoinment, putAppoinment, deleteAppoinment, getAllAppoinment, Appoinment};
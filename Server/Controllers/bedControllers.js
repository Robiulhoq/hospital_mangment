const mongoose = require('mongoose');
const BedSchema = require('../Schema/BedSchema.js');
const Bed = mongoose.model("Bed", BedSchema);
const createError = require('../utils/error.js');

const createdBed = async (req, res, next) => {
    const newBed = new Bed(req.body);
    try {
        const savedBed = await newBed.save();
        res.status(200).json(savedBed);
    } catch (error){
        next(error)
    }
}

const putBed = async (req, res, next) =>{
    try {
        const updateBed = await Bed.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateBed)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteBed = async (req, res, next) =>{
    try {
        await Bed.findByIdAndDelete(req.params.id);
        res.status(200).json("Bed has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllBed = async (req, res, next) =>{
    try {
        const Beds = await Bed.find();
          res.status(200).json(Beds)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdBed, putBed, deleteBed, getAllBed, Bed};
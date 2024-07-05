const mongoose = require('mongoose');
const BedAssainSchema = require('../Schema/BedAssainSchema.js');
const BedAssain = mongoose.model("BedAssain", BedAssainSchema);
const createError = require('../utils/error.js');

const createdBedAssain = async (req, res, next) => {
    const newBedAssain = new BedAssain(req.body);
    try {
        const savedBedAssain = await newBedAssain.save();
        res.status(200).json(savedBedAssain);
    } catch (error){
        next(error)
    }
}

const putBedAssain = async (req, res, next) =>{
    try {
        const updateBedAssain = await BedAssain.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateBedAssain)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteBedAssain = async (req, res, next) =>{
    try {
        await BedAssain.findByIdAndDelete(req.params.id);
        res.status(200).json("BedAssain has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllBedAssain = async (req, res, next) =>{
    try {
        const BedAssains = await BedAssain.find();
          res.status(200).json(BedAssains)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdBedAssain, putBedAssain, deleteBedAssain, getAllBedAssain, BedAssain};
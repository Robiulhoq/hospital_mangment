const mongoose = require('mongoose');
const HumenResourceSchema = require('../Schema/HumenSchema.js');
const HumenResource = mongoose.model("HumenResource", HumenResourceSchema);
const createError = require('../utils/error.js');

const createdHumenResource = async (req, res, next) => {
    const newHumenResource = new HumenResource(req.body);
    try {
        const savedHumenResource = await newHumenResource.save();
        res.status(200).json(savedHumenResource);
    } catch (error){
        next(error)
    }
}

const putHumenResource = async (req, res, next) =>{
    try {
        const updateHumenResource = await HumenResource.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateHumenResource)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteHumenResource = async (req, res, next) =>{
    try {
        await HumenResource.findByIdAndDelete(req.params.id);
        res.status(200).json("HumenResource has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllHumenResource = async (req, res, next) =>{
    try {
        const HumenResources = await HumenResource.find();
          res.status(200).json(HumenResources)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdHumenResource, putHumenResource, deleteHumenResource, getAllHumenResource, HumenResource};
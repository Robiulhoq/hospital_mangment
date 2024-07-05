const mongoose = require('mongoose');
const LabreportSchema = require('../Schema/LabReportSchema.js');
const Labreport = mongoose.model("Labreport", LabreportSchema);
const createError = require('../utils/error.js');

const createdLabreport = async (req, res, next) => {
    const newLabreport = new Labreport(req.body);
    try {
        const savedLabreport = await newLabreport.save();
        res.status(200).json(savedLabreport);
    } catch (error){
        next(error)
    }
}

const putLabreport = async (req, res, next) =>{
    try {
        const updateLabreport = await Labreport.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateLabreport)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteLabreport = async (req, res, next) =>{
    try {
        await Labreport.findByIdAndDelete(req.params.id);
        res.status(200).json("Labreport has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllLabreport = async (req, res, next) =>{
    try {
        const Labreports = await Labreport.find();
          res.status(200).json(Labreports)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdLabreport, putLabreport, deleteLabreport, getAllLabreport, Labreport};
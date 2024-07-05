const mongoose = require('mongoose');
const PDocumentSchema = require('../Schema/PDocumentSchema');
const PDocument = mongoose.model("PDocument", PDocumentSchema);
const createError = require('../utils/error.js');

const createdPDocument = async (req, res, next) => {
    const newPDocument = new PDocument(req.body);
    try {
        const savedPDocument = await newPDocument.save();
        res.status(200).json(savedPDocument);
    } catch (error){
        next(error)
    }
}

const putPDocument = async (req, res, next) =>{
    try {
        const updatePDocument = await PDocument.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updatePDocument)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deletePDocument = async (req, res, next) =>{
    try {
        await PDocument.findByIdAndDelete(req.params.id);
        res.status(200).json("PDocument has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllPDocument = async (req, res, next) =>{
    try {
        const PDocuments = await PDocument.find();
          res.status(200).json(PDocuments)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdPDocument, putPDocument, deletePDocument, getAllPDocument, PDocument};
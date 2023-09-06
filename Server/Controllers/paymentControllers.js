const mongoose = require('mongoose');
const PaymentSchema = require('../Schema/PaymentSchema.js');
const Payment = mongoose.model("Payment", PaymentSchema);
const createError = require('../utils/error.js');

const createdPayment = async (req, res, next) => {
    const newPayment = new Payment(req.body);
    try {
        const savedPayment = await newPayment.save();
        res.status(200).json(savedPayment);
    } catch (error){
        next(error)
    }
}

const putPayment = async (req, res, next) =>{
    try {
        const updatePayment = await Payment.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updatePayment)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deletePayment = async (req, res, next) =>{
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json("Payment has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllPayment = async (req, res, next) =>{
    try {
        const Payments = await Payment.find();
          res.status(200).json(Payments)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdPayment, putPayment, deletePayment, getAllPayment, Payment};
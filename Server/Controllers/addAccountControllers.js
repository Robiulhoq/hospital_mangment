const mongoose = require('mongoose');
const AccountSchema = require('../Schema/AddAccountSchema.js');
const Account = mongoose.model("Account", AccountSchema);
const createError = require('../utils/error.js');

const createdAccount = async (req, res, next) => {
    const newAccount = new Account(req.body);
    try {
        const savedAccount = await newAccount.save();
        res.status(200).json(savedAccount);
    } catch (error){
        console.log(error);
        next(error)
    }
}

const putAccount = async (req, res, next) =>{
    try {
        const updateAccount = await Account.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateAccount)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteAccount = async (req, res, next) =>{
    try {
        await Account.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllAccount = async (req, res, next) =>{
    try {
        const Accounts = await Account.find();
          res.status(200).json(Accounts)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdAccount, putAccount, deleteAccount, getAllAccount, Account};
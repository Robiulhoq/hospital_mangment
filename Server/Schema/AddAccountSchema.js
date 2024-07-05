const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountName:{
        type: String,
        required: true
    },
    accountType:{
        type: String,
        required: true
    },
    drescription:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },

})

module.exports = AccountSchema;
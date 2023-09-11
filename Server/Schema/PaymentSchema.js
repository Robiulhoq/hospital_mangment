const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    accountName:{
        type: String,
        required: true
    },
    payTo:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = PaymentSchema;
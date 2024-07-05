const mongoose = require('mongoose');

const HumenResourceSchema = new mongoose.Schema({
    userRole:{
        type: String,
        required: true
    },
    fastName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobileNo:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = HumenResourceSchema;
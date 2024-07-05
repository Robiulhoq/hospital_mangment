const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    AppoinmentName:{
        type: String,
        required: true
    },
    avabileDays:{
        type: String,
        required: true
    },
    avavileTimeStart:{
        type: String,
        required: true
    },
    avavileTimeEnd:{
        type: String,
        required: true
    },
    perPatientTime:{
        type: String,
        required: true
    },
    serialVisibility:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = AppoinmentSchema;
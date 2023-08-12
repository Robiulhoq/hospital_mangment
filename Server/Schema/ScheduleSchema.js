const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    doctorName:{
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

module.exports = DoctorSchema;
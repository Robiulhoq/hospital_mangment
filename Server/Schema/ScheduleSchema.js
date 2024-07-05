const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    abailableDays:{
        type: String,
        required: true
    },
    availableTime:{
        type: String,
        required: true
    },
    patientTime:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = DoctorSchema;

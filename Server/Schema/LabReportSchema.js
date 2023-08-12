const mongoose = require('mongoose');

const LabreportSchema = new mongoose.Schema({
    patientId:{
        type: String,
        required: true
    },
    refDoctorName:{
        type: String,
        required: true
    },
    problem:{
        type: String,
        required: true
    },
    attatchFile:{
        type: String,
        required: true
    }
});

module.exports = LabreportSchema;
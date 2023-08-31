const mongoose = require('mongoose');

const LabreportSchema = new mongoose.Schema({
    patientId:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    testName:{
        type: String,
        required: true
    },
    result:{
        type: String,
        required: true
    },
    doctorName:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = LabreportSchema;
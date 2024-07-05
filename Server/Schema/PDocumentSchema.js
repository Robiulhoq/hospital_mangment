const mongoose = require('mongoose');

const PDocumentSchema = new mongoose.Schema({
    patientId:{
        type: String,
        required: true
    },
    doctorName:{
        type: String,
        required: true
    },
    attatchFile:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = PDocumentSchema;
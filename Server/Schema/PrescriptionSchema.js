const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
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
    designation:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    ShortBiography:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    specialist:{
        type: String,
        required: true
    },
    dathOfBirth:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    bloudGroup:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = PrescriptionSchema;
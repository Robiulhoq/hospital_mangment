const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
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
    department:{
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
    schedule:[
        {
            abailableDays: {
                type: String
            },
            availableTime: {
                type: String
            },
            patientTime: {
                type: String
            },
            status: {
                type: String
            },
            // You can add more properties related to the schedule if needed
        }
    ],
    status:{
        type: String,
        required: true
    }
});

module.exports = DoctorSchema;
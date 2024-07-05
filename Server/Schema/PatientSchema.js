const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    fastName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    dathOfBirth: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    appoinment: [
        {
            doctorName: {
                type: String
            },
            department: {
                type: String
            },
            date: {
                type: String
            },
            problem: {
                type: String
            },
            status: {
                type: String
            }
        }
    ],
    caseStudy: [String],
    prescription: [String],
    status: {
        type: String,
        required: true
    }
});

module.exports = PatientSchema;


const mongoose = require('mongoose');

const BedAssainSchema = new mongoose.Schema({
    patientId:{
        type: String,
        required: true,
    },
    bedType:{
        type: Number
    },
    assainDate:{
        type: Date,
        required: true
    },
    dischargeDate:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    },
     status:{
        type: String,
        required: true
    }
});

module.exports = BedAssainSchema;
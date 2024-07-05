const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
    bedType:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    bedCapacity:{
        type: String
    },
    charge:{
        type: Number
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = BedSchema;
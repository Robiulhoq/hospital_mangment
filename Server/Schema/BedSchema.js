const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
    bedName:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = BedSchema;
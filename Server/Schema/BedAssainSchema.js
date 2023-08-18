const mongoose = require('mongoose');

const BedAssainSchema = new mongoose.Schema({
    bedassainName:{
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

module.exports = BedAssainSchema;
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    medicineName:{
        type: String,
        required: true
    },
    categoryName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    manufacturedBy:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = MedicineSchema;
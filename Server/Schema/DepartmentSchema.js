const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    departmentName:{
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

module.exports = DepartmentSchema;
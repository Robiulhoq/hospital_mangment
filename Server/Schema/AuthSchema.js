const  mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userRole:{
        type: String
    }
}, {
    timestamps: true });

module.exports = AuthSchema;
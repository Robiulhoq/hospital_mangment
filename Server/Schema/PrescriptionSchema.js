const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientId: String,
    prescriptions: [
        {
            medicineName: String,
            medicineType: String,
            instruction: String,
            day: String
        }
    ],
    diagnoses: [
        {
            diagnosis: String,
            instruction: String
        }
    ]
    
    
});



module.exports = prescriptionSchema;

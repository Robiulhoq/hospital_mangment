const mongoose = require('mongoose');

const CaseStudySchema = new mongoose.Schema({
    patientId:{
        type: String,
        required: true
    },
    footAllergies:{
        type: String,
        required: true
    },
    tendencyBleed:{
        type: String,
        required: true
    },
    heartDisease:{
        type: String,
        required: true
    },
    highBloodPressure:{
        type: String,
        required: true
    },
    diabetic:{
        type: String,
        required: true
    },
    sergery:{
        type: String,
        required: true
    },
    accident:{
        type: String,
        required: true
    },
    other:{
        type: String,
        required: true
    },
    familyMedicalHistory:{
        type: String,
        required: true
    },
    currentMedicine:{
        type: String,
        required: true
    },
    femalePregnancy:{
        type: String,
        required: true
    },
    breastFeeding:{
        type: String,
        required: true
    },
    healthInsureance:{
        type: String,
        required: true
    },
    lowIncome:{
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },

})

module.exports = CaseStudySchema;
const mongoose = require('mongoose');
const AddCaseStudySchema = require('../Schema/AddCaseStudySchema.js');
const CaseStudy = mongoose.model("CaseStudy", AddCaseStudySchema);
const { Patient } = require('../Controllers/patientControllers.js');


const createCaseStydy = async (req, res, next) => {
    const patientId = req.params.id;
    const newCaseStudy = new CaseStudy(req.body);
    try {
        const saveCaseStudy = await newCaseStudy.save();
        try {
            await Patient.findOneAndUpdate({ _id: patientId }, {
                $push:{
                    caseStudy: saveCaseStudy._id
                }
            })

            res.status(200).json(saveCaseStudy);
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}
const getAllCaseStudy = async (req, res, next) =>{
    try{
        const CaseStudys = await CaseStudy.find();
        res.status(200).json(CaseStudys);
    }catch(error){
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {createCaseStydy, getAllCaseStudy, CaseStudy};
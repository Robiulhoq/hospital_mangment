const mongoose = require('mongoose');
const DoctorSchema = require('../Schema/DoctorSchema.js');
const Doctor = mongoose.model("Doctor", DoctorSchema);
const createError = require('../utils/error.js');

const createdDoctor = async (req, res, next) => {
    const newDoctor = new Doctor(req.body);
    try {
        const savedDoctor = await newDoctor.save();
        res.status(200).json(savedDoctor);
    } catch (error){
        next(error)
    }
}

const putDoctor = async (req, res, next) =>{
    try {
        const updateDoctor = await Doctor.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateDoctor)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteDoctor = async (req, res, next) =>{
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json("Doctor has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllDoctor = async (req, res, next) =>{
    try {
        const Doctors = await Doctor.find();
          res.status(200).json(Doctors)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}
// Schedule add (schedule api create start)

const createdSchedule = async (req, res, next) =>{
    const doctorId = req.params.id;
    try{
        const updateSchedule = await Doctor.findOneAndUpdate({ _id: doctorId }, {
            $push:{
                schedule: req.body
            }
        },
        { new: true })
        res.status(200).json(updateSchedule)
    } catch (error){
        res.status(500).json({
            error: error
        })
    }

}

const putSchedule = async (req, res, next) => {
    const doctorId = req.params.id;
    const scheduleId = req.params.scheduleId; // Assuming you pass scheduleId in the URL
    
    try {
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: doctorId, "schedule._id": scheduleId }, // Find doctor by ID and matching schedule ID
            {
                $set: {
                    "schedule.$.abailableDays": req.body.abailableDays, // Update schedule fields as needed
                    "schedule.$.availableTime": req.body.availableTime,
                    "schedule.$.patientTime": req.body.patientTime,
                    "schedule.$.status": req.body.status,
                    // Add more fields to update here
                }
            },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ error: "Doctor or schedule not found" });
        }

        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

const deleteSchedule = async (req, res, next) => {
    const doctorId = req.params.id;
    const scheduleId = req.params.scheduleId; // Assuming you pass scheduleId in the URL
    
    try {
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: doctorId },
            {
                $pull: {
                    schedule: { _id: scheduleId } // Remove the matching schedule from the array
                }
            },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

module.exports = { createdDoctor, putDoctor, deleteDoctor, getAllDoctor, createdSchedule, putSchedule, deleteSchedule, deleteSchedule, Doctor };


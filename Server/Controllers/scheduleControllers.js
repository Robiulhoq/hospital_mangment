const mongoose = require('mongoose');
const ScheduleSchema = require('../Schema/ScheduleSchema.js');
const Schedule = mongoose.model("Schedule", ScheduleSchema);
const { Doctor } = require('../Controllers/DoctorControllers.js');
const createError = require('../utils/error.js');

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

const putSchedule = async (req, res, next) =>{
    try {
        const updateSchedule = await Schedule.findByIdAndUpdate(req.params.id,
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateSchedule)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

const deleteSchedule = async (req, res, next) =>{
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.status(200).json("Schedule has been deleted")
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllSchedule = async (req, res, next) =>{
    try {
        const Schedules = await Schedule.find();
          res.status(200).json(Schedules)
      } catch (error) {
          res.status(500).json({
              error: error
          })
      }
}

module.exports = {createdSchedule, putSchedule, deleteSchedule, getAllSchedule, Schedule};
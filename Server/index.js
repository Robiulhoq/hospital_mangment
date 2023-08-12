const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const authRouter = require('./router/auth.js');
const departmentRouter = require('./router/department.js');
const doctorRouter = require('./router/doctor.js');
const patientRouter = require('./router/patient.js');
const patientDocumentRouter = require('./router/pDocument.js');
const schedule = require('./router/schedule.js');
const appoinment = require('./router/appoinment.js');
const Labreport = require('./router/labreport.js');

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/HospitalManagment")
        console.log("Connected to Mongodb");
    } catch (error) {
        throw error

    }
}
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/patientdocument', patientDocumentRouter);
app.use('/schedule', schedule);
app.use('/appoinment', appoinment);
app.use('/labreport', Labreport);


app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMassage = err.message || "Somthing went worng";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMassage,
        stack: err.stack
    })
})

app.listen(5000, () => {
    connect();
    console.log("backend connected!");
})
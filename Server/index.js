const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
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
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dv8sz8mml',
  api_key: '259259562123635',
  api_secret: '1j0AJuSvwFzlQp3mLUSrETNN_ak'
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
const storage = new multer.memoryStorage();
const upload = multer({ storage });

app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/patientdocument', patientDocumentRouter);
app.use('/schedule', schedule);
app.use('/appoinment', appoinment);
app.use('/labreport', Labreport);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMassage = err.message || "Somthing went worng";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMassage,
    stack: err.stack
  })
})

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});


app.listen(5000, () => {
  connect();
  console.log("backend connected!");
})
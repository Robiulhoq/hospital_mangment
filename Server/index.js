const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const app = express();

const authRouter = require("./router/auth.js");
const departmentRouter = require("./router/department.js");
const doctorRouter = require("./router/doctor.js");
const patientRouter = require("./router/patient.js");
const patientDocumentRouter = require("./router/pDocument.js");
const schedule = require("./router/schedule.js");
const appoinment = require("./router/appoinment.js");
const Labreport = require("./router/labreport.js");
const CaseStudy = require("./router/caseStudy.js");
const Medicine = require("./router/medicine.js");
const Bed = require("./router/bed.js");
const BedAssain = require("./router/bedAssain.js");
const Hr = require("./router/humenResource.js");
const prescription = require("./router/prescription.js");
const Lab = require("./router/labreport.js");
const Account = require("./router/account.js");
const Invoice = require("./router/invoice.js");
const Payment = require("./router/payment.js");

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tx9ov.mongodb.net/HospitalManagment?retryWrites=true&w=majority`
    );
    console.log("Connected to Mongodb");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://hospital-mangment.vercel.app", // Replace with your frontend URL
    credentials: true,
  })
);
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
const storage = new multer.memoryStorage();
const upload = multer({ storage });

app.use("/auth", authRouter);
app.use("/department", departmentRouter);
app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);
app.use("/patientdocument", patientDocumentRouter);
app.use("/schedule", schedule);
app.use("/appoinment", appoinment);
app.use("/labreport", Labreport);
app.use("/casestudy", CaseStudy);
app.use("/medicine", Medicine);
app.use("/bed", Bed);
app.use("/assainbed", BedAssain);
app.use("/hr", Hr);
app.use("/prescription", prescription);
app.use("/lab", Lab);
app.use("/account", Account);
app.use("/invoice", Invoice);
app.use("/payment", Payment);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMassage = err.message || "Somthing went worng";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMassage,
    stack: err.stack,
  });
});

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
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  connect();
  console.log("backend connected!");
});

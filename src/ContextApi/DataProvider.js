import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getCookie } from "../Utils/getCookie";
import { DataContext } from "./DataContext";
const DataProvider = ({ children }) => {
  // Load  all department function start here
  const [tigger, setTigger] = useState(false);

  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const { data: departmentList } = useFetch(
    "https://hospital-mangment.onrender.com/department",
    tigger
  );
  const handleEditDepartment = (id) => setEditDepartmentId(id);

  // Load alll doctor fuction start here
  const [editDoctorId, setEditDoctorId] = useState(null);
  const { data: doctorList } = useFetch(
    "https://hospital-mangment.onrender.com/doctor",
    tigger
  );
  const handleEditDoctor = (id) => setEditDoctorId(id);

  // Load all patient function start here
  const token = getCookie("access_token");
  const [editPatientId, setEditPatientId] = useState(null);

  const { data: patientList = [] } = useFetch(
    "https://hospital-mangment.onrender.com/patient",
    tigger
  );
  const hendleEditPatient = (id) => setEditPatientId(id);

  // Schedule
  const [editSchedule, setEditSchedule] = useState({
    id: "",
    scheduleId: "",
  });
  const hendleEditSchedule = (id, scheduleId) => {
    setEditSchedule((preveditSchedule) => ({
      ...preveditSchedule,
      id: id,
      scheduleId: scheduleId,
    }));
  };
  // case study api intregation start
  const { data: caseStudyList } = useFetch(
    "https://hospital-mangment.onrender.com/casestudy",
    tigger
  );

  // medicine  API intregation start
  const [editMedicineId, setEditMedicineId] = useState("");
  const { data: medicineList } = useFetch(
    "https://hospital-mangment.onrender.com/medicine",
    tigger
  );
  const hendleEditMedicine = (id) => setEditMedicineId(id);

  // Bed API intregation start

  const [editBedId, setEditBedId] = useState("");
  const { data: bedList } = useFetch(
    "https://hospital-mangment.onrender.com/bed",
    tigger
  );
  const hendleEditBed = (id) => setEditBedId(id);

  // HR API intregation start

  const [editHrId, setEditHrId] = useState("");
  const { data: hrList } = useFetch(
    "https://hospital-mangment.onrender.com/hr",
    tigger
  );
  const hendleEditHr = (id) => setEditHrId(id);

  // Lab Test API intergation start

  const [eidtLabId, setEditLabId] = useState("");
  const { data: labList } = useFetch(
    "https://hospital-mangment.onrender.com/lab",
    tigger
  );
  const hendleEditLab = (id) => setEditLabId(id);

  // Account API intergation start

  const [editAccoutId, setEditAccoutId] = useState("");
  const { data: accountList } = useFetch(
    "https://hospital-mangment.onrender.com/account",
    tigger
  );
  const hendleEditAccount = (id) => setEditAccoutId(id);
  // pataient

  // Assain Bed API intergation start

  const [editAssainBedId, setEditAssainBedId] = useState("");
  const { data: assainBedList } = useFetch(
    "https://hospital-mangment.onrender.com/assainbed",
    tigger
  );
  const hendleEditAssainBed = (id) => setEditAssainBedId(id);

  // Payment API intergation start

  const [editPaymentId, setEditPaymentId] = useState("");
  const { data: paymentList } = useFetch(
    "https://hospital-mangment.onrender.com/payment",
    tigger
  );
  const hendleEditPayment = (id) => setEditPaymentId(id);

  // Invoice API intergation start

  const { data: invoiceList } = useFetch(
    "https://hospital-mangment.onrender.com/invoice",
    tigger
  );

  return (
    <div>
      <DataContext.Provider
        value={{
          tigger,
          setTigger,

          departmentList,
          editDepartmentId,
          handleEditDepartment,

          doctorList,
          editDoctorId,
          handleEditDoctor,

          patientList,
          editPatientId,
          hendleEditPatient,

          editSchedule,
          hendleEditSchedule,

          caseStudyList,

          medicineList,
          hendleEditMedicine,
          editMedicineId,

          bedList,
          hendleEditBed,
          editBedId,

          hrList,
          hendleEditHr,
          editHrId,

          labList,
          hendleEditLab,
          eidtLabId,

          accountList,
          hendleEditAccount,
          editAccoutId,

          assainBedList,
          hendleEditAssainBed,
          editAssainBedId,

          paymentList,
          hendleEditPayment,
          editPaymentId,

          invoiceList,
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};

export default DataProvider;

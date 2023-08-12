import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Department from './pages/Department/Department';
import ListDepartment from './pages/Department/ListDepartment';
import Doctor from './pages/Doctor/Doctor';
import DoctorList from './pages/Doctor/DoctorList';
import Patient from './pages/Patient/Patient';
import ListPatient from './pages/Patient/ListPatient';
import AddPatientDoc from './pages/Patient/AddPatientDoc';
import ListPatientDoc from './pages/Patient/ListPatientDoc';
import Schedule from './pages/Schedule/Schedule';
import ListSchedule from './pages/Schedule/ListSchedule';
import Prescription from './pages/Prescription/Prescription';
import ListPrescription from './pages/Prescription/LIstPrescription';
import PrintPrescription from './pages/Prescription/PrintPrescription';
import Finance from './pages/Finance/Finance';
import ListInvoice from './pages/Finance/ListInvoice';
import AddPayment from './pages/Finance/AddPayment';
import ListPayment from './pages/Finance/ListPayment';
import AddService from './pages/Finance/AddService';
import ListService from './pages/Finance/LIstService';
import LabTest from './pages/Labtest/Labtest';
import TestReport from './pages/Labtest/TestReport';
import Hr from './pages/Hr/Hr';
import EmployList from './pages/Hr/EmployList';
import AddMedicine from './pages/Medicine/Medicine';
import MedicineList from './pages/Medicine/MedicineList';
import AssignBed from './pages/Bed_manager/AssignBed';
import AssignBedList from './pages/Bed_manager/AssignBedList';
import BedManager from './pages/Bed_manager/Bed_manager';
import BedList from './pages/Bed_manager/BedList';
import Appoinment from './pages/Appoinment/Appoinment';
import AppoinmentList from './pages/Appoinment/AppoinmentList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
  },
  {
    path: "/auth",
    element: <Auth/>,
  },
  {
    path: "department/0",
    element: <Department/>,
  },
  {
    path: "department/1",
    element: <ListDepartment/>,
  },
  {
    path: "doctor/0",
    element: <Doctor/>,
  },
  {
    path: "doctor/1",
    element: <DoctorList/>,
  },
  {
    path: "patient/0",
    element: <Patient/>,
  },
  {
    path: "patient/1",
    element: <ListPatient/>,
  },
  {
    path: "patient/2",
    element: <AddPatientDoc/>,
  },
  {
    path: "patient/3",
    element: <ListPatientDoc/>,
  },
  {
    path: "schedule/0",
    element: <Schedule/>,
  },
  {
    path: "schedule/1",
    element: <ListSchedule/>,
  },
  {
    path: "appoinment/0",
    element: <Appoinment/>,
  },
  {
    path: "appoinment/1",
    element: <AppoinmentList/>,
  },
  {
    path: "prescripton/0",
    element: <Prescription/>,
  },
  {
    path: "prescripton/1",
    element: <ListPrescription/>,
  },
  {
    path: "prescripton/2",
    element: <PrintPrescription/>,
  },
  {
    path: "finance/0",
    element: <Finance/>,
  },
  {
    path: "finance/1",
    element: <ListInvoice/>,
  },
  {
    path: "finance/2",
    element: <AddService/>,
  },
  {
    path: "finance/3",
    element: <ListPayment/>,
  },
  {
    path: "finance/4",
    element: <AddPayment/>,
  },
  {
    path: "finance/5",
    element: <ListService/>,
  },
  {
    path: "labtest/0",
    element: <LabTest/>,
  },
  {
    path: "labtest/1",
    element: <TestReport/>,
  },
  {
    path: "hr/0",
    element: <Hr/>,
  },
  {
    path: "hr/1",
    element: <EmployList/>,
  },
  {
    path: "medicine/0",
    element: <AddMedicine/>,
  },
  {
    path: "medicine/0",
    element: <MedicineList/>,
  },
  {
    path: "bed/0",
    element: <AssignBed/>,
  },
  {
    path: "bed/1",
    element: <AssignBedList/>,
  },
  {
    path: "bed/2",
    element: <BedManager/>,
  },
  {
    path: "bed/3",
    element: <BedList/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



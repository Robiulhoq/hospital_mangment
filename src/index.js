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
import AddAccount from './pages/Finance/AddAccount';
import ListAccount from './pages/Finance/ListAccount';
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
import AddPrescription from './pages/Prescription/AddPrescription';
import DataProvider from './ContextApi/DataProvider';
import PrintExample from './pages/Prescription/PrintExample';
import PrintInvoice from './pages/Finance/PrintInvoice';

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
    element: <DataProvider><Department/></DataProvider>,
  },
  {
    path: "department/1",
    element:<DataProvider><ListDepartment/></DataProvider> ,
  },
  {
    path: "doctor/0",
    element: <DataProvider><Doctor/></DataProvider>  ,
  },
  {
    path: "doctor/1",
    element:<DataProvider><DoctorList/></DataProvider>  ,
  },
  {
    path: "patient/0",
    element:<DataProvider><Patient/></DataProvider> ,
  },
  {
    path: "patient/1",
    element:<DataProvider><ListPatient/></DataProvider> ,
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
    element:<DataProvider><Schedule/></DataProvider> ,
  },
  {
    path: "schedule/1",
    element:<DataProvider><ListSchedule/></DataProvider> ,
  },
  {
    path: "appoinment/0",
    element:<DataProvider><Appoinment/></DataProvider> ,
  },
  {
    path: "appoinment/1",
    element:<DataProvider><AppoinmentList/></DataProvider>,
  },
  {
    path: "prescripton/0",
    element:<DataProvider> <Prescription/></DataProvider>,
  },
  {
    path: "prescripton/1",
    element: <DataProvider> <ListPrescription/></DataProvider> ,
  },
  {
    path: "prescripton/2",
    element: <PrintExample/>,
  },
  {
    path: "prescripton/3",
    element: <DataProvider> <AddPrescription/></DataProvider> ,
  },
  {
    path: "finance/0",
    element: <DataProvider> <Finance/></DataProvider> ,
  },
  {
    path: "finance/1",
    element: <PrintInvoice /> ,
  },
  {
    path: "finance/2",
    element: <DataProvider> <AddAccount/></DataProvider> ,
  },
  {
    path: "finance/3",
    element: <DataProvider> <ListAccount/></DataProvider>  ,
  },
  {
    path: "finance/4",
    element:<DataProvider> <AddPayment/></DataProvider> ,
  },
  {
    path: "finance/5",
    element:<DataProvider> <ListPayment/></DataProvider> ,
  },
  {
    path: "labtest/0",
    element:<DataProvider> <LabTest/></DataProvider> ,
  },
  {
    path: "labtest/1",
    element: <DataProvider> <TestReport/></DataProvider> ,
  },
  {
    path: "hr/0",
    element:<DataProvider> <Hr/></DataProvider> ,
  },
  {
    path: "hr/1",
    element:<DataProvider> <EmployList/></DataProvider> ,
  },
  {
    path: "medicine/0",
    element:<DataProvider> <AddMedicine/></DataProvider>,
  },
  {
    path: "medicine/1",
    element:<DataProvider> <MedicineList/></DataProvider> ,
  },
  {
    path: "bed/0",
    element:<DataProvider> <BedManager/></DataProvider> , 
  },
  {
    path: "bed/1",
    element:<DataProvider> <BedList/></DataProvider> , 
  },
  {
    path: "bed/2",
    element:<DataProvider> <AssignBed/></DataProvider> ,
  },
  {
    path: "bed/3",
    element:<DataProvider> <AssignBedList/></DataProvider> ,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Import your elements here

import DataProvider from "./ContextApi/DataProvider";
import { getCookie } from "./Utils/getCookie";
import {
  AccountedRoute,
  AdminRoute,
  DoctorRoute,
  NurseRoute,
} from "./components/PrivateRoute";
import Appoinment from "./pages/Appoinment/Appoinment";
import AppoinmentList from "./pages/Appoinment/AppoinmentList";
import Login from "./pages/Auth/Login";
import AssignBed from "./pages/Bed_manager/AssignBed";
import AssignBedList from "./pages/Bed_manager/AssignBedList";
import BedList from "./pages/Bed_manager/BedList";
import BedManager from "./pages/Bed_manager/Bed_manager";
import Dashboard from "./pages/Dashboard/Dashboard";
import Department from "./pages/Department/Department";
import ListDepartment from "./pages/Department/ListDepartment";
import Doctor from "./pages/Doctor/Doctor";
import DoctorList from "./pages/Doctor/DoctorList";
import AddAccount from "./pages/Finance/AddAccount";
import AddPayment from "./pages/Finance/AddPayment";
import Finance from "./pages/Finance/Finance";
import ListAccount from "./pages/Finance/ListAccount";
import ListPayment from "./pages/Finance/ListPayment";
import PrintInvoice from "./pages/Finance/PrintInvoice";
import EmployList from "./pages/Hr/EmployList";
import Hr from "./pages/Hr/Hr";
import LabTest from "./pages/Labtest/Labtest";
import TestReport from "./pages/Labtest/TestReport";
import AddMedicine from "./pages/Medicine/Medicine";
import MedicineList from "./pages/Medicine/MedicineList";
import AddPatientDoc from "./pages/Patient/AddPatientDoc";
import ListPatient from "./pages/Patient/ListPatient";
import ListPatientDoc from "./pages/Patient/ListPatientDoc";
import Patient from "./pages/Patient/Patient";
import AddPrescription from "./pages/Prescription/AddPrescription";
import ListPrescription from "./pages/Prescription/LIstPrescription";
import Prescription from "./pages/Prescription/Prescription";
import PrintExample from "./pages/Prescription/PrintExample";
import ListSchedule from "./pages/Schedule/ListSchedule";
import Schedule from "./pages/Schedule/Schedule";

function App() {
  // const {userRole} = useContext(DataContext);
  // console.log(userRole);
  const [userRole, setUserRole] = useState("");

  const token = getCookie("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          "https://hospital-mangment.onrender.com/auth/token",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setUserRole(data.userRole);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };
    checkToken();
  }, [token]);

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/");
    } else if (userRole === "doctor") {
      navigate("/doctor/1");
    } else if (userRole === "nurse") {
      navigate("/bed/1");
    } else if (userRole === "accounted") {
      navigate("/finance/0");
    }
  }, [userRole]);
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={<Login setUserRole={setUserRole} />}
      />
      <Route
        exact
        path="/"
        element={
          <DoctorRoute user={userRole}>
            <Dashboard userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/:routePage/0"
        element={
          <AdminRoute user={userRole}>
            <Department userRole={userRole} />
          </AdminRoute>
        }
      />
      <Route
        path="/:routePage/1"
        element={
          <AdminRoute user={userRole}>
            <ListDepartment userRole={userRole} />
          </AdminRoute>
        }
      />
      <Route
        path="/doctor/0"
        element={
          <DoctorRoute user={userRole}>
            <Doctor userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/doctor/1"
        element={
          <DoctorRoute user={userRole}>
            <DoctorList userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/patient/0"
        element={
          <DoctorRoute user={userRole}>
            <Patient userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/patient/1"
        element={
          <DoctorRoute user={userRole}>
            <ListPatient userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/patient/2"
        element={
          <DoctorRoute user={userRole}>
            <AddPatientDoc userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/patient/3"
        element={
          <DoctorRoute user={userRole}>
            <ListPatientDoc userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/schedule/0"
        element={
          <DoctorRoute user={userRole}>
            <Schedule userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/schedule/1"
        element={
          <DoctorRoute user={userRole}>
            <ListSchedule userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/appoinment/0"
        element={
          <DoctorRoute user={userRole}>
            <Appoinment userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/appoinment/1"
        element={
          <DoctorRoute user={userRole}>
            <AppoinmentList userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/prescription/0"
        element={
          <DoctorRoute user={userRole}>
            <Prescription userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/prescription/1"
        element={
          <DoctorRoute user={userRole}>
            <ListPrescription userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/prescription/2"
        element={
          <DoctorRoute user={userRole}>
            <AddPrescription userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/prescription/3"
        element={
          <DoctorRoute user={userRole}>
            <PrintExample userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/finance/0"
        element={
          <AccountedRoute user={userRole}>
            <Finance userRole={userRole} />
          </AccountedRoute>
        }
      />
      <Route
        path="/finance/1"
        element={
          <AccountedRoute user={userRole}>
            <PrintInvoice userRole={userRole} />
          </AccountedRoute>
        }
      />
      <Route
        path="/finance/2"
        element={
          <AccountedRoute user={userRole}>
            <AddAccount userRole={userRole} />
          </AccountedRoute>
        }
      />
      <Route
        path="/finance/3"
        element={
          <AccountedRoute user={userRole}>
            <ListAccount userRole={userRole} />
          </AccountedRoute>
        }
      />
      <Route
        path="/finance/4"
        element={
          <AccountedRoute user={userRole}>
            <AddPayment userRole={userRole} />
          </AccountedRoute>
        }
      />
      <Route
        path="/finance/5"
        element={
          <AccountedRoute user={userRole}>
            <ListPayment userRole={userRole} />
          </AccountedRoute>
        }
      />
      <Route
        path="/labtest/0"
        element={
          <DoctorRoute user={userRole}>
            <LabTest userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/labtest/1"
        element={
          <DoctorRoute user={userRole}>
            <TestReport userRole={userRole} />
          </DoctorRoute>
        }
      />
      <Route
        path="/hr/0"
        element={
          <AdminRoute user={userRole}>
            <Hr userRole={userRole} />
          </AdminRoute>
        }
      />
      <Route
        path="/hr/1"
        element={
          <AdminRoute user={userRole}>
            <EmployList userRole={userRole} />
          </AdminRoute>
        }
      />
      <Route
        path="/medicine/0"
        element={
          <AdminRoute user={userRole}>
            <AddMedicine userRole={userRole} />
          </AdminRoute>
        }
      />
      <Route
        path="/medicine/1"
        element={
          <AdminRoute user={userRole}>
            <MedicineList userRole={userRole} />
          </AdminRoute>
        }
      />
      <Route
        path="/bed/0"
        element={
          <NurseRoute user={userRole}>
            <BedManager userRole={userRole} />
          </NurseRoute>
        }
      />
      <Route
        path="/bed/1"
        element={
          <NurseRoute user={userRole}>
            <BedList userRole={userRole} />
          </NurseRoute>
        }
      />
      <Route
        path="/bed/2"
        element={
          <NurseRoute user={userRole}>
            <AssignBed userRole={userRole} />
          </NurseRoute>
        }
      />
      <Route
        path="/bed/3"
        element={
          <NurseRoute user={userRole}>
            <AssignBedList userRole={userRole} />
          </NurseRoute>
        }
      />
    </Routes>
  );
}

const MainApp = () => (
  <Router>
    <DataProvider>
      <App />
    </DataProvider>
  </Router>
);

export default MainApp;

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
    path: "patient/3",
    element: <AddPatientDoc/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



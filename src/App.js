import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your elements here

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
import DataProvider from './ContextApi/DataProvider'
import PrintExample from './pages/Prescription/PrintExample';
import PrintInvoice from './pages/Finance/PrintInvoice';
import {DoctorRoute, AccountedRoute, NurseRoute, AdminRoute} from './components/PrivateRoute';
import Login from './pages/Auth/Login';
import { DataContext } from './ContextApi/DataContext';
import Sidebar from './components/Sidebar';

function App() {

  // const {userRole} = useContext(DataContext);
  // console.log(userRole);
  const [userRole, setUserRole] = useState('');

  return (
    <Router>
      <div className="App">
       

        <Routes>
          
          <Route exact path="/login" element={<DataProvider>< Login setUserRole={setUserRole} /></DataProvider>    } />
          <Route exact path="/" element={<DoctorRoute user={userRole}><DataProvider><Dashboard userRole={userRole} /></DataProvider>  </DoctorRoute>} />

          <Route path="/department/0" element={<AdminRoute user={userRole}><DataProvider><Department userRole={userRole}  /></DataProvider>  </AdminRoute>} />
          <Route path="/department/1" element={<AdminRoute user={userRole}><DataProvider><ListDepartment userRole={userRole}  /></DataProvider>  </AdminRoute>} />

          <Route path="/doctor/0" element={<DoctorRoute user={userRole}><DataProvider><Doctor userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/doctor/1" element={<DoctorRoute user={userRole}><DataProvider><DoctorList userRole={userRole}  /></DataProvider>  </DoctorRoute> } />
          <Route path="/patient/0" element={<DoctorRoute user={userRole}><DataProvider><Patient userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/patient/1" element={<DoctorRoute user={userRole}><DataProvider><ListPatient userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/patient/2" element={<DoctorRoute user={userRole}><DataProvider><AddPatientDoc userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/patient/3" element={<DoctorRoute user={userRole}><DataProvider><ListPatientDoc userRole={userRole}  /></DataProvider>  </DoctorRoute>} />

          <Route path="/schedule/0" element={<DoctorRoute user={userRole}><DataProvider><Schedule userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/schedule/1" element={<DoctorRoute user={userRole}><DataProvider><ListSchedule userRole={userRole}  /></DataProvider>  </DoctorRoute>} />

          <Route path="/appoinment/0" element={<DoctorRoute user={userRole}><DataProvider><Appoinment userRole={userRole} /></DataProvider>  </DoctorRoute>} />
          <Route path="/appoinment/1" element={<DoctorRoute user={userRole}><DataProvider><AppoinmentList userRole={userRole}  /></DataProvider>  </DoctorRoute>} />

          <Route path="/prescripton/0" element={<DoctorRoute user={userRole}><DataProvider><Prescription  userRole={userRole} /></DataProvider>  </DoctorRoute>} />
          <Route path="/prescripton/1" element={<DoctorRoute user={userRole}><DataProvider><ListPrescription userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/prescripton/2" element={<DoctorRoute user={userRole}><DataProvider><PrintExample userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/prescripton/3" element={<DoctorRoute user={userRole}><DataProvider><AddPrescription userRole={userRole}  /></DataProvider>  </DoctorRoute>} />

          <Route path="/finance/0" element={<AccountedRoute user={userRole}><DataProvider><Finance userRole={userRole}  /></DataProvider>  </AccountedRoute>} />
          <Route path="/finance/1" element={<AccountedRoute user={userRole}><DataProvider><PrintInvoice userRole={userRole}  /></DataProvider>  </AccountedRoute>} />
          <Route path="/finance/2" element={<AccountedRoute user={userRole}><DataProvider><AddAccount userRole={userRole}  /></DataProvider>  </AccountedRoute>} />
          <Route path="/finance/3" element={<AccountedRoute user={userRole}><DataProvider><ListAccount userRole={userRole}  /></DataProvider>  </AccountedRoute>} />
          <Route path="/finance/4" element={<AccountedRoute user={userRole}><DataProvider><AddPayment  userRole={userRole} /></DataProvider>  </AccountedRoute>} />
          <Route path="/finance/5" element={<AccountedRoute user={userRole}><DataProvider><ListPayment userRole={userRole}  /></DataProvider>  </AccountedRoute>} />

          <Route path="/labtest/0" element={<DoctorRoute user={userRole}><DataProvider><LabTest userRole={userRole}  /></DataProvider>  </DoctorRoute>} />
          <Route path="/labtest/1" element={<DoctorRoute user={userRole}><DataProvider><TestReport userRole={userRole}  /></DataProvider>  </DoctorRoute>} />

          <Route path="/hr/0" element={<AdminRoute user={userRole}><DataProvider><Hr userRole={userRole}  /></DataProvider>  </AdminRoute>} />
          <Route path="/hr/1" element={<AdminRoute user={userRole}><DataProvider><EmployList  userRole={userRole} /></DataProvider>  </AdminRoute>} />

          <Route path="/medicine/0" element={<AdminRoute user={userRole}><DataProvider><AddMedicine userRole={userRole}  /></DataProvider>  </AdminRoute>} />
          <Route path="/medicine/1" element={<AdminRoute user={userRole}><DataProvider><MedicineList userRole={userRole}  /></DataProvider>  </AdminRoute>} />

          <Route path="/bed/0" element={<NurseRoute user={userRole}><DataProvider><BedManager userRole={userRole}  /></DataProvider>  </NurseRoute>} />
          <Route path="/bed/1" element={<NurseRoute user={userRole}><DataProvider><BedList userRole={userRole}  /></DataProvider>  </NurseRoute>} />
          <Route path="/bed/2" element={<NurseRoute user={userRole}><DataProvider><AssignBed  userRole={userRole} /></DataProvider>  </NurseRoute>} />
          <Route path="/bed/3" element={<NurseRoute user={userRole}><DataProvider><AssignBedList userRole={userRole}  /></DataProvider>  </NurseRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

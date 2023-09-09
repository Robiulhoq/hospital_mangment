import React, { useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import { getCookie } from '../Utils/getCookie';

const DataProvider = ({ children }) => {

    // Load  all department function start here
     
    const token = getCookie('access_token');
   
    const [departmentList, setDepartmentList] = useState([]);
    const [editDepartmentId, setEditDepartmentId] = useState(null);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/department', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the access token
          },
        })
          .then(res => res.json())
          .then(data => setDepartmentList(data))
      }, [update]); // Make sure to include accessToken in the dependency array
      

    const updateUI = (state) => {
        setUpdate(state);
    }
    const handleEditDepartment = (id) => {
        setEditDepartmentId(id);
    };


    // Load alll doctor fuction start here

    const [doctorList, setDoctorList] = useState([]);
    const [editDoctorId, setEditDoctorId] = useState(null);
    const [doctorUI, setDoctorUI] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/doctor',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
            .then(res => res.json())
            .then(data => setDoctorList(data))
    }, [doctorUI])

    const handleEditDoctor = (id) => {
        setEditDoctorId(id);
    };

    const hendleDoctorUI = (state) => {
        setDoctorUI(state)
    }

    // Load all patient function start here

    const [patientList, setPatientList] = useState([]);
    const [editPatientId, setEditPatientId] = useState(null);
    const [patientUI, setPatientUI] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/patient',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
            .then(res => res.json())
            .then(data => setPatientList(data))
    }, [patientUI]);

    const hendleEditPatient = (id) => {
        setEditPatientId(id);
    }

    const hendlePatientUI = (state) => {
        setPatientUI(state);
    }
    // Schedule
    const [editSchedule, setEditSchedule] = useState({
        id: '',
        scheduleId: ''
    });
    const hendleEditSchedule = (id, scheduleId) => {
        setEditSchedule(preveditSchedule => ({
            ...preveditSchedule,
            id: id,
            scheduleId: scheduleId
        }));
    }
    // case study api intregation start
    const [caseStudyList, setCaseStudyList] = useState([]);
    const [caseStudyUI, setCaseStudyUI] = useState(false)
    useEffect(()=>{
        fetch('http://localhost:5000/casestudy',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setCaseStudyList(data))
    }, [caseStudyUI]);
    const hendleCaseStudyUI = (state) =>{
        setCaseStudyUI(state)
    }

    // medicine  API intregation start

    const [medicineList, setMedicineList] = useState([]);
    const [editMedicineId, setEditMedicineId] = useState('');
    const [medicineUI, setMedicineUI] = useState(false);
    useEffect(()=>{
        fetch('http://localhost:5000/medicine',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setMedicineList(data));
    },[medicineUI]);
    const hendleMedicineUI = (state) =>{
        setMedicineUI(state);
    }
    const hendleEditMedicine = id =>{
        setEditMedicineId(id)
    }

    // Bed API intregation start

    const [bedList, setBedList] = useState([]);
    const [editBedId, setEditBedId] = useState('');
    const [bedUI, setBedUI] = useState(false);
    useEffect(()=>{
        fetch('http://localhost:5000/bed',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setBedList(data));
    },[bedUI]);
    const hendleBedUI = (state) =>{
        setBedUI(state);
    }
    const hendleEditBed = id =>{
        setEditBedId(id)
    }
    // HR API intregation start
    const [hrList, setHrList] = useState([]);
    const [editHrId, setEditHrId] = useState('');
    const [hrUI, setHrUI] = useState(false);
    useEffect(()=>{
        fetch('http://localhost:5000/hr', {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setHrList(data));
    },[hrUI]);
    const hendleHrUI = (state) =>{
        setHrUI(state);
    };
    const hendleEditHr = (id) =>{
        setEditHrId(id);
    }

    // Lab Test API intergation start
    const [labList, setLabList] = useState([]);
    const [eidtLabId, setEditLabId] = useState('');
    const [labUI, setLabUI] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/lab',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setLabList(data))
    },[labUI]);
    const hendleLabUI = (state) =>{
        setLabUI(state);
    }
    const hendleEditLab = id =>{
        setEditLabId(id);
    }

    // Account API intergation start
    const [accountList, setAccountList] = useState([]);
    const [editAccoutId, setEditAccoutId] = useState('');
    const [accoutUI, setAccoutUI] = useState(true);
    
    useEffect(()=>{
        fetch('http://localhost:5000/account', {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setAccountList(data))
    }, [accoutUI]);
    const hendleAccoutUI = state =>{
        setAccoutUI(state);
    }
    const hendleEditAccount = id =>{
        setEditAccoutId(id);
    }

    
    // Assain Bed API intergation start
    const [assainBedList, setAssainBedList] = useState([]);
    const [editAssainBedId, setEditAssainBedId] = useState('');
    const [assainBedUI, setAssainBedUI] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/assainbed',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setAssainBedList(data))
    },[assainBedUI])
    
    const hendleAssainBedUI = state =>{
        setAssainBedUI(state);
    }
    const hendleEditAssainBed = id =>{
        setEditAssainBedId(id);
    }

    // Payment API intergation start
    const [paymentList, setPaymentList] = useState([]);
    const [editPaymentId, setEditPaymentId] = useState('');
    const [paymentUI, setPaymentUI] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/payment',{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the access token
            },
          })
        .then(res => res.json())
        .then(data => setPaymentList(data))
    }, [paymentUI]);
    const hendlePaymentUI = state =>{
        setPaymentUI(state);
    }
    const hendleEditPayment = id =>{
        setEditPaymentId(id);
    }

    
    return (
        <div>
            <DataContext.Provider value={{
                updateUI,
                departmentList,
                editDepartmentId,
                handleEditDepartment,

                doctorList,
                editDoctorId,
                handleEditDoctor,
                hendleDoctorUI,

                patientList,
                editPatientId,
                hendleEditPatient,
                hendlePatientUI,

                editSchedule,
                hendleEditSchedule,

                caseStudyList,
                hendleCaseStudyUI,

                medicineList,
                hendleMedicineUI,
                hendleEditMedicine,
                editMedicineId,

                bedList,
                hendleBedUI,
                hendleEditBed,
                editBedId,

                hrList,
                hendleHrUI,
                hendleEditHr,
                editHrId,

                labList,
                hendleLabUI,
                hendleEditLab,
                eidtLabId,

                accountList,
                hendleAccoutUI,
                hendleEditAccount,
                editAccoutId,

                assainBedList,
                hendleAssainBedUI,
                hendleEditAssainBed,
                editAssainBedId,

                paymentList,
                hendlePaymentUI,
                hendleEditPayment,
                editPaymentId,

               
            }}>
                {children}
            </DataContext.Provider>
        </div>
    )
}

export default DataProvider;
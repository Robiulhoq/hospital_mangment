import React, { useEffect, useState } from 'react';
import { DataContext } from './DataContext';

const DataProvider = ({children}) => {

    // Load  all department function start here

    const [departmentList, setDepartmentList] = useState([]);
    const [editDepartmentId, setEditDepartmentId] = useState(null);
    const [update, setUpdate] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/department')
            .then(res => res.json())
            .then(data => setDepartmentList(data))
    }, [update]);

    const updateUI = (state) =>{
        setUpdate(state);
    }
    const handleEditDepartment = (id) => {
        setEditDepartmentId(id);
    };


    // Load alll doctor fuction start here

    const [doctorList, setDoctorList] = useState([]);
    const [editDoctorId, setEditDoctorId] = useState(null);
    const [doctorUI, setDoctorUI] = useState(false)
    useEffect(()=>{
        fetch('http://localhost:5000/doctor')
            .then(res => res.json())
            .then(data => setDoctorList(data))
    }, [doctorUI])

    const handleEditDoctor = (id) => {
        setEditDoctorId(id);
    };

    const hendleDoctorUI = (state) =>{
        setDoctorUI(state)
    }

    // Load all patient function start here

    const [patientList, setPatientList] = useState([]);
    const [editPatientId, setEditPatientId] = useState(null);
    const [patientUI, setPatientUI] = useState(false);
    useEffect(() =>{
        fetch('http://localhost:5000/patient')
        .then(res => res.json())
        .then(data => setPatientList(data))
    }, [patientUI]);

    const hendleEditPatient = (id) =>{
        setEditPatientId(id);
    }

    const hendlePatientUI = (state) =>{
        setPatientUI(state);
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
                hendlePatientUI
                }}>
                {children}
            </DataContext.Provider>
        </div>
    )
}

export default DataProvider;
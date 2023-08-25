import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import TextInput from '../../components/TextInput';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import { DataContext } from '../../ContextApi/DataContext';
import Message from '../../components/Message';
import { Loading } from '../../components/Loading';
import axios from 'axios';

function Patient() {
    const { patientList, hendlePatientUI, editPatientId} = useContext(DataContext);
    const [message, setMessage] = useState('');
    const [patient, setPatient] = useState({
        fastName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        mobileNo: '',
        bloodGroup: 'A+',
        dathOfBirth: '',
        sex: 'Male',
        picture: '',
        address: '',
        status: 'active'
    });

    const hendleChange = (e) => {
        const updatePatient = { ...patient }
        updatePatient[e.target.name] = e.target.value;
        setPatient(updatePatient);
    }
    useEffect(()=>{ 
        if(editPatientId && patientList){
            const editPatient = patientList.find(item => item._id === editPatientId)
            
            setPatient( prevPatient => ( {
                ...prevPatient,
                fastName: editPatient.fastName ,
                lastName: editPatient.lastName ,
                emailAddress: editPatient.emailAddress ,
                password: editPatient.password ,
                mobileNo: editPatient.mobileNo ,
                bloodGroup: editPatient.bloodGroup ,
                dathOfBirth:  editPatient.dathOfBirth,
                sex: editPatient.sex ,
                picture: editPatient.picture ,
                address: editPatient.address ,
                status: editPatient.status 
            }))
            setEditMode(true);
        }

    }, [editPatientId])
    const [image, setImage] = useState(null);
    const hendleSetImage = (img) => {
        setImage(img);
    }
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('my_file', image);
            const response = await axios.post('http://localhost:5000/upload', formData);
            const updatePatient = { ...patient }
            updatePatient.picture = response.data.secure_url;
            setPatient(updatePatient);

        } catch (error) {
            console.error(error);
        }
    }

    const hendleSavePatient = async () => {
        try {

            const response = await fetch('http://localhost:5000/patient', {
                method: 'POST',
                body: JSON.stringify(patient),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setLoading(false);
                setMessage('Patient save successful');
                hendlePatientUI(true);
                setPatient(prePatient => ({
                    ...prePatient,
                    fastName: '',
                    lastName: '',
                    emailAddress: '',
                    password: '',
                    mobileNo: '',
                    bloodGroup: 'A+',
                    dathOfBirth: '',
                    sex: 'Male',
                    picture: '',
                    address: '',
                    status: 'active'
                }))
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (patient.picture && !editPatientId) {
            hendleSavePatient();
        }
    }, [patient.picture]);

    const [editMode, setEditMode] = useState(false);
    

    const hendleEditPatient = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/patient/${editPatientId}`, {
                method: 'PUT',
                body: JSON.stringify(patient),
                headers: { 'Content-Type': 'application/json' }
            });
            hendlePatientUI(true);
            response.message = 'Patient edit successfull';
            setMessage(response.message);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendlePatientUI(false)
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Patient' />
                <Message message={message} />
                {
                    loading ? <Loading /> :
                        <Activity>
                            <TextInput onChange={hendleChange} defaultValue={patient.fastName} type='text' name='fastName' title='Fast Name' placeholder='Fast name' />
                            <TextInput onChange={hendleChange} defaultValue={patient.lastName} type='text' name='lastName' title='Last Name' placeholder='Last name' />
                            <TextInput onChange={hendleChange} defaultValue={patient.emailAddress} type='text' name='emailAddress' title='Email address' placeholder='Email address' />
                            <TextInput onChange={hendleChange} defaultValue={patient.password} type='text' name='password' title='Password' placeholder='Password' />
                            <TextInput onChange={hendleChange} defaultValue={patient.mobileNo} type='text' name='mobileNo' title='Mobile No' placeholder='Mobile no' />
                            <TextInput onChange={hendleChange} type='radio' name='bloodGroup' value={patient.bloodGroup} title='Blood group' placeholder='Blood group' options={[{ label: 'A+', value: 'A+' },
                            { label: 'A-', value: 'A-' },
                            { label: 'B+', value: 'B+' },
                            { label: 'B-', value: 'B-' },
                            { label: 'o+', value: 'o+' }
                            ]} />
                            <TextInput onChange={hendleChange} defaultValue={patient.dathOfBirth} type='text' name='dathOfBirth' title='Date of birth' placeholder='Dath of birth' />
                            <TextInput onChange={hendleChange} type='radio' value={patient.sex} name='sex' title='Sex' options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]} />
                            <TextInput onChange={hendleSetImage} title='Picture' type='file' placeholder='Dath of birth' />
                            <TextInput onChange={hendleChange} defaultValue={patient.address} title='Address' name='address' type='textarea' placeholder='Address' />
                            <TextInput onChange={hendleChange} name='status' title='Status' type='radio' value={patient.status} options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                            <GreenButton onClick={editMode? hendleEditPatient: handleImageUpload}>Save</GreenButton>
                        </Activity>
                }

            </Content>
        </Wrapper>
    )
}

export default Patient
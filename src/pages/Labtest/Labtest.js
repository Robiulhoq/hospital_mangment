import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import Message from "../../components/Message";
import { Loading } from "../../components/Loading";
import { DataContext } from "../../ContextApi/DataContext";
import { getCookie } from "../../Utils/getCookie";
import { Link } from "react-router-dom";

function LabTest({userRole}) {
    const { labList, hendleLabUI, eidtLabId } = useContext(DataContext);
    const [lab, setLab] = useState({
        patientId: '',
        date: '',
        testName: '',
        result: '',
        doctorName: '',
        status: 'active'
    });

    const hendleChange = (e) => {
        const updateLab = { ...lab }
        updateLab[e.target.name] = e.target.value;
        setLab(updateLab)
    };
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const token = getCookie('access_token');
    const hendleSaveLabTest = async () => {

        try {
            setLoading(true);
            const response = await fetch('https://hospital-mangment.onrender.com/lab', {
                method: 'POST',
                body: JSON.stringify(lab),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                setLoading(false);
                response.message = "Lab report Add Successsfull";
                setMessage(response.message);
                setLab(...prvTest => ({
                    ...prvTest,
                    patientId: '',
                    date: '',
                    testName: '',
                    result: '',
                    doctorName: '',
                    status: 'active'
                }))

            }
        } catch (error) {
            console.log(error);
        }
    }
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (eidtLabId && labList) {
            setEditMode(true);
            const editLab = labList.find(item => item._id === eidtLabId);
            setLab(prvLab => ({
                patientId: editLab.patientId,
                date: editLab.date,
                testName: editLab.testName,
                result: editLab.result,
                doctorName: editLab.doctorName,
                status: editLab.status
            }))
        }
    }, [eidtLabId])

    const hendleEditLab = async () =>{
        try{
            setLoading(true);
            const response = await fetch(`https://hospital-mangment.onrender.com/lab/${eidtLabId}`, {
                method: 'PUT',
                body: JSON.stringify(lab),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if(response.status === 200){
                
                response.message = 'Lab report edit successfull';
                setMessage(response.message)
                hendleLabUI(true);
                setLab(...prvTest => ({
                    ...prvTest,
                    patientId: '',
                    date: '',
                    testName: '',
                    result: '',
                    doctorName: '',
                    status: 'active'
                }))
            }
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    if (message) {
        setInterval(() => {
            setMessage('');
            hendleLabUI(false);
        }, 5000);
    }

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Labtest' />
                <Message message={message} />
                {
                    loading === true ? <Loading /> :
                        <Activity>
                            <Link to='/labtest/1' ><GreenButton>List report</GreenButton></Link> 
                            <TextInput name='patientId' defaultValue={lab.patientId} onChange={hendleChange} type='text' title='Patient Id' placeholder='Patient Id' />
                            <TextInput name='date' defaultValue={lab.date} onChange={hendleChange} type='text' title='Date' placeholder='Date' />
                            <TextInput name='testName' defaultValue={lab.testName} onChange={hendleChange} type='text' title='Test Name' placeholder='Test Name' />
                            <TextInput name='result' defaultValue={lab.result} onChange={hendleChange} type='textarea' title='Result' placeholder='Result' />
                            <TextInput name='doctorName' defaultValue={lab.doctorName} onChange={hendleChange} type='radio' title='Doctor Name' options={[{ label: 'Robiul', value: 'Robiul' }]} />
                            <TextInput name='status' defaultValue={lab.status} onChange={hendleChange} type='radio' title='Status' options={[{ label: 'Active', value: 'Active' }]} />
                            <GreenButton onClick={editMode? hendleEditLab: hendleSaveLabTest} >Save</GreenButton>
                        </Activity>
                }

            </Content>
        </Wrapper>
    )
}
export default LabTest;
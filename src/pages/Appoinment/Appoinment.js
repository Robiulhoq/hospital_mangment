import React, { useContext, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import axios from "axios";
import Message from "../../components/Message";
function Appoinment() {
    const { departmentList, doctorList, hendlePatientUI } = useContext(DataContext);
    const [appoinment, setAppoinment] = useState({
        doctorName: '',
        department: '',
        date: '',
        problem: '',
        status: 'active'
    });
    
    const hendleChange = (e) => {
        const updateAppoinment = { ...appoinment }
        updateAppoinment[e.target.name] = e.target.value;
        setAppoinment(updateAppoinment);
    }
    const [patientId, setPatientId] = useState('');
    const [message, setMessage] = useState('');
    const handleSaveAppointment = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/patient/appoinment/${patientId}`,
                appoinment, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                hendlePatientUI(true);
                response.message = 'Appoinment add successfull';
                setMessage(response.message);
                setAppoinment(prvAppoinment => ({
                    ...prvAppoinment,
                    doctorName: '',
                    department: '',
                    date: '',
                    problem: '',
                    status: 'active'
                }))
            }
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
                <TopBar title='Add Appoinment' />
                <Message message={message} />
                <Activity>
                    <TextInput type='text' onChange={(e) => setPatientId(e.target.value)} title='Patient ID' placeholder='Patient ID' />
                    <TextInput type='radio' onChange={hendleChange} name='department' title='Department Name ' placeholder='Department Name' options={departmentList.map(item => ({ label: item.departmentName, value: item.departmentName }))} />
                    <TextInput type='radio' name='doctorName' onChange={hendleChange} title='Doctor Name ' placeholder='Doctor Name' options={doctorList.map(item => ({ label: item.fastName, value: item.fastName }))} />

                    <TextInput type='text' name='date' onChange={hendleChange} title='Appointment Date *' placeholder='Appointment Date *1' />
                    <TextInput type='textarea' name='problem' onChange={hendleChange} title='Problem' placeholder='Problem' />
                    <TextInput type='radio' name='status' onChange={hendleChange} title='Status' placeholder='Status' 
                    options={[{label: 'Active', value: 'active'}, {label: 'Deactive', value: 'Deactive'}]} />
                    <GreenButton onClick={handleSaveAppointment}>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Appoinment;
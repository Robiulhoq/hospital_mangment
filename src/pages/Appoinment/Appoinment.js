import React, { useContext, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import axios from "axios";
import Message from "../../components/Message";
import { getCookie } from '../../Utils/getCookie';
import { Link } from "react-router-dom";
function Appoinment({userRole}) {
    const { departmentList, doctorList, hendlePatientUI } = useContext(DataContext);
    const [appoinment, setAppoinment] = useState({
        doctorName: '',
        department: '',
        date: '',
        problem: '',
        status: 'active'
    });
    console.log(appoinment);
    const hendleChange = (e) => {
        const updateAppoinment = { ...appoinment }
        updateAppoinment[e.target.name] = e.target.value;
        setAppoinment(updateAppoinment);
    }
    const [patientId, setPatientId] = useState('');
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const [loading, setLoading] = useState(false);
    const handleSaveAppointment = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`https://hospital-mangment.onrender.com/patient/appoinment/${patientId}`,
                appoinment, {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
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
            setLoading(false);
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
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Appoinment' />
                <Message message={message} />
                <Activity>
                <Link to='/appoinment/1' ><GreenButton>List Appoinment</GreenButton></Link>
                    <TextInput type='text' onChange={(e) => setPatientId(e.target.value)} title='Patient ID' placeholder='Patient ID' />
                    <TextInput type='radio' onChange={hendleChange} name='department' title='Department Name ' placeholder='Department Name'

                        options={departmentList.map(item => ({ label: item.departmentName, value: item.departmentName }))} />

                    <TextInput type='radio' name='doctorName' onChange={hendleChange} title='Doctor Name ' placeholder='Doctor Name'
                        options={doctorList.map(item => (
                            { label: appoinment.department === item.department ? item.fastName : null, value: appoinment.department === item.department ? item.fastName : null }

                        )
                        )} />
                    {
                        doctorList.map(item => (appoinment.doctorName === item.fastName ?
                            item.schedule.map(items => (
                               
                                    <li style={{marginLeft: '19rem', listStyle: 'none', color: 'green'}}>{items.abailableDays + ' ' + items.availableTime}</li>
                                
                            )): null
                            ))
                    }

                    <TextInput type='date' name='date' onChange={hendleChange} title='Appointment Date *' placeholder='Appointment Date *1' />
                    <TextInput type='textarea' name='problem' onChange={hendleChange} title='Problem' placeholder='Problem' />
                    <TextInput type='radio' name='status' onChange={hendleChange} title='Status' placeholder='Status'
                        options={[{ label: 'Active', value: 'active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={handleSaveAppointment}>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Appoinment;
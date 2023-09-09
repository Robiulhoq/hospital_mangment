import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
import { getCookie } from "../../Utils/getCookie";

function Schedule({userRole}) {
    const { doctorList, editSchedule, hendleDoctorUI } = useContext(DataContext);
    const [schedule, setSchedule] = useState({
        abailableDays: '',
        availableTime: '',
        patientTime: '',
        status: 'active'
    }
    );

    const hendleChange = (e) => {
        const updateSchedule = { ...schedule }
        updateSchedule[e.target.name] = e.target.value;
        setSchedule(updateSchedule);
    }
    const [editDoctorid, setEditDoctorId] = useState('');
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleAddDoctorSchedule = async () => {

        try {
            const response = await fetch(`http://localhost:5000/doctor/schedule/${editDoctorid}`, {
                method: 'POST',
                body: JSON.stringify(schedule),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if(response.status === 200){
                response.message = 'Schedule add successfull';
                setMessage(response.message);
                hendleDoctorUI(true);
                setSchedule(prevSchedule => ({
                    ...prevSchedule,
                    abailableDays: '',
                    availableTime: '',
                    patientTime: '',
                    status: 'active'
                }))
            }
           

        } catch (error) {
            console.log(error);
        }

    }
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (editSchedule.id && editSchedule.scheduleId && doctorList) {

            setEditMode(true);
            doctorList.map(item => item.schedule.find(sc => {
                if (sc._id === editSchedule.scheduleId) {
                    setSchedule(prvSchedule => ({
                        ...prvSchedule,
                        abailableDays: sc.abailableDays,
                        availableTime: sc.availableTime,
                        patientTime: sc.patientTime,
                        status: sc.status
                    }))
                }

            }));



        }
    }, [editSchedule]);

    const hendleEditSchedule = async () => {
        try {
            const response = await fetch(`http://localhost:5000/doctor/schedule/${editSchedule.id}/${editSchedule.scheduleId}`, {
                method: 'PUT',
                body: JSON.stringify(schedule),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                setSchedule(prevSchedule => ({
                    ...prevSchedule,
                    abailableDays: '',
                    availableTime: '',
                    patientTime: '',
                    status: 'active'
                }))
                hendleDoctorUI(true);
                response.message = 'Schedule edit successfull';
                setMessage(response.message);
            }

        } catch (error) {
            console.log(error);
        }
    }
    const week = [
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' }
    ];

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Schedule' />
                <Message message={message} />
                <Activity>
                    <TextInput
                        name="doctorId"
                        type="radio"
                        title="Doctor Name"
                        options={doctorList.map(item => (
                            { label: item.fastName, value: item._id }
                        ))}
                        onChange={event => setEditDoctorId(event.target.value)}
                    />

                    <TextInput onChange={hendleChange} name='abailableDays' type='radio' title='Available Days' options={week} />
                    <TextInput onChange={hendleChange} defaultValue={schedule.availableTime} name='availableTime' type='text' title='Available Time' placeholder='12:15 - 01:15' />
                    <TextInput onChange={hendleChange} defaultValue={schedule.patientTime} name='patientTime' type='text' title='Per Patient Time' />
                    <TextInput onChange={hendleChange} name='status' type='radio' title='Status'
                        options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deative' }]} />
                    <GreenButton onClick={editMode ? hendleEditSchedule : hendleAddDoctorSchedule}>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Schedule;
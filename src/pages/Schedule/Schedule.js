import React, { useContext, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
function Schedule() {
    const { doctorList } = useContext(DataContext);
    const [schedule, setSchedule] = useState(
        {
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
    
    const hendleAddDoctorSchedule = async () => {

        try {
            const response = await fetch(`http://localhost:5000/doctor/schedule/${editDoctorid}`, {
                method: 'POST',
                body: JSON.stringify(schedule),
                headers: { 'Content-Type': 'application/json' }
            });

            response.message = 'Doctor edit successfull';

        } catch (error) {
            console.log(error);
        }

    }
    const week = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wedsday', 'Thuday', 'Friday'];
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Schedule' />
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

                    <TextInput onChange={hendleChange} name='abailableDays' type='text' title='Available Days' options={week} />
                    <TextInput onChange={hendleChange} name='availableTime' type='text' title='Available Time' placeholder='12:15 - 01:15' />
                    <TextInput onChange={hendleChange} name='patientTime' type='text' title='Per Patient Time' />
                    <TextInput onChange={hendleChange} name='status' type='radio' title='Status' 
                    options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deative' }]} />
                    <GreenButton onClick={hendleAddDoctorSchedule}>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Schedule;
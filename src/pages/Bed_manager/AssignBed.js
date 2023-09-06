import React, { useContext, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import Message from "../../components/Message";
import { DataContext } from "../../ContextApi/DataContext";


function AssignBed() {
    const { bedList, hendleAssainBedUI } = useContext(DataContext);
    const [assainBed, setAssainBed] = useState({
        patientId: '',
        bedType: 0,
        assainDate: 0,
        dischargeDate: 0,
        description: '',
        status: 'active'
    });
    console.log(assainBed);
    const hendleChange = (e) => {
        const updateAssainBed = { ...assainBed };
        updateAssainBed[e.target.name] = e.target.value;
        setAssainBed(updateAssainBed);
    }
    const [message, setMessage] = useState('')
    const hendeAssainBed = async () => {
        try {
            const response = await fetch('http://localhost:5000/assainbed', {
                method: 'POST',
                body: JSON.stringify(assainBed),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                response.message = "Assain Bed Successfull!"
                setMessage(response.message);
                hendleAssainBedUI(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (message) {
        setInterval(() => {
            setMessage('');
            hendleAssainBedUI(false);
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Assain Bed' />
                <Message message={message} />
                <Activity>
                    <TextInput name='patientId' onChange={hendleChange} title='Patient ID' type='text' placeholder='Patient Id' />
                    <TextInput name='bedType' onChange={hendleChange} title='Bed Type' type='radio'
                        options={bedList ? bedList.map(item => ({ label: item.bedType, value: item.charge })) : null} placeholder='Bed Type' />
                    <TextInput name='assainDate' onChange={hendleChange} title='Assain Date' type='date' placeholder='Assain Date' />
                    <TextInput name='dischargeDate' onChange={hendleChange} title='Discharge Date' type='date' placeholder='Discharge Date' />
                    <TextInput name='description' onChange={hendleChange} title='Description' type='textarea' placeholder='Description' />
                    <TextInput name='status' onChange={hendleChange} title='Status' type='radio'
                        options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={hendeAssainBed} >Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AssignBed;
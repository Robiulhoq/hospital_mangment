import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import axios from "axios";
import Message from "../../components/Message";
import { getCookie } from "../../Utils/getCookie";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";

function BedManager({userRole}) {
    const { hendleBedUI, editBedId, bedList } = useContext(DataContext);
    const [bed, setBed] = useState({
        bedType: '',
        description: '',
        bedCapacity: '',
        charge: 0,
        status: 'active'
    });


    const hendleChange = (e) => {
        const updateBed = { ...bed }
        updateBed[e.target.name] = e.target.value;
        setBed(updateBed);
    }
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const [loading, setLoading] = useState(false);
    const hendleSaveBed = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://hospital-mangment.onrender.com/bed', bed, {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                response.message = 'Bed add successfull';
                setMessage(response.message);
                hendleBedUI(true);
                setBed(prvBed => ({
                    ...prvBed,
                    bedType: '',
                    description: '',
                    bedCapacity: '',
                    charge: 0,
                    status: 'active'
                }))
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (editBedId && bedList) {
            setEditMode(true);
            const editBed = bedList.find(item => item._id === editBedId);
            setBed(prvBed => ({
                ...prvBed,
                bedType: editBed.bedType,
                description: editBed.description,
                bedCapacity: editBed.bedCapacity,
                charge: editBed.charge,
                status: editBed.status
            }))
        }
    }, [editBedId]);

    const hendleEditBed = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://hospital-mangment.onrender.com/bed/${editBedId}`, {
                method: 'PUT',
                body: JSON.stringify(bed),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                response.message = 'Bed Edit Successfull';
                setMessage(response.message);
                hendleBedUI(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleBedUI(false);
        }, 5000);
    }

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Bed' />
                <Message message={message} />
                {
                    loading? <Loading />:
                
                <Activity>
                    <Link to='/bed/1' ><GreenButton>Bed List</GreenButton></Link> 
                    <TextInput defaultValue={bed.bedType} onChange={hendleChange} name='bedType' title='Bed Type' type='text' placeholder='Bed Type' />
                    <TextInput defaultValue={bed.description} onChange={hendleChange} name='description' title='Description' type='textarea' placeholder='Description' />
                    <TextInput defaultValue={bed.bedCapacity} onChange={hendleChange} name='bedCapacity' title='Bed Capacity ' type='text' placeholder='Bed Capacity ' />
                    <TextInput defaultValue={bed.charge} onChange={hendleChange} name='charge' title='Charge' type='text' placeholder='Charge' />
                    <TextInput defaultValue={bed.status} onChange={hendleChange} name='status' title='Status' type='radio'
                        options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode ? hendleEditBed : hendleSaveBed} >Save</GreenButton>
                </Activity>}
            </Content>
        </Wrapper>
    )
}
export default BedManager;
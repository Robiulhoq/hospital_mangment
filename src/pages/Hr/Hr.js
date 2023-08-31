import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
import axios from "axios";


function Hr() {
    const { hrList, hendleHrUI, editHrId } = useContext(DataContext);
    const [hr, setHr] = useState({
        userRole: '',
        fastName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        mobileNo: '',
        sex: 'Male',
        picture: '',
        address: '',
        status: 'active'
    });
    
    const hendleChange = (e) => {
        const updateHr = { ...hr }
        updateHr[e.target.name] = e.target.value;
        setHr(updateHr);
    }
    const [image, setImage] = useState(null);

    const hendleSetImage = (img) => {
        setImage(img)
    }
    const hendleImageUpload = async () => {

        try {
            const formData = new FormData();
            formData.append('my_file', image);
            const response = await axios.post('http://localhost:5000/upload', formData);
            const updateHr = { ...hr }
            updateHr.picture = response.data.secure_url;
            setHr(updateHr);

        } catch (error) {
            console.error(error);
        }
    }
    const [message, setMessage] = useState('')
    const hendleSaveHr = async () => {

        try {

            const response = await fetch('http://localhost:5000/hr', {
                method: 'POST',
                body: JSON.stringify(hr),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                hendleHrUI(true);
                response.message = "HR Save successfull"
                setMessage(response.message);

                setHr(prevHr => ({
                    ...prevHr,
                    userRole: '',
                    fastName: '',
                    lastName: '',
                    emailAddress: '',
                    password: '',
                    mobileNo: '',
                    sex: 'Male',
                    picture: '',
                    address: '',
                    status: 'active'
                }));

            } else {
                console.log(response.statusText);
            }

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if (hr.picture && !editHrId) {
            hendleSaveHr();
        }

    }, [hr.picture]);

    // data edit state. if true data will be edit
    const [editMode, setEditMode] = useState(false);
    //  edit avabile data show in input field
    useEffect(() => {
        if (editHrId && hrList) {
            const editHr = hrList.find(item => item._id === editHrId);
            // Find the doctor in doctorList based on editDoctorId
            console.log(editHr);
            // Set the component state to the values of the found department
            setHr(prevHr => ({
                ...prevHr,
                fastName: editHr.fastName,
                userRole: editHr.userRole,
                lastName: editHr.lastName,
                emailAddress: editHr.emailAddress,
                password: editHr.password,
                mobileNo: editHr.mobileNo,
                sex: editHr.sex,
                picture: editHr.picture,
                address: editHr.address,
                status: editHr.status
            }));
            setEditMode(true);
        }
    }, [editHrId, hrList]);

    const hendleEditHr = async () => {
        try {
            const response = await fetch(`http://localhost:5000/hr/${editHrId}`, {
                method: 'PUT',
                body: JSON.stringify(hr),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                hendleHrUI(true);
                response.message = 'Hr edit successfull';
                setMessage(response.message);
            }
        } catch (error) {
            console.log(error);
        }

    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleHrUI(false)
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Humen resource' />
                <Message message={message} />
                <Activity>
                    <TextInput onChange={hendleChange} name='userRole' title='User Role' type='radio'
                        options={[{ label: 'Admin', value: 'Admin' }, { label: 'Doctor', value: 'Doctor' }, { label: 'Patient', value: 'Patient' }]} />
                    <TextInput defaultValue={hr.fastName} onChange={hendleChange} name='fastName' title='Fast Name' type='text' placeholder='Fast Name' />
                    <TextInput defaultValue={hr.lastName} onChange={hendleChange} name='lastName' title='Last Name' type='text' placeholder='Last Name' />
                    <TextInput defaultValue={hr.emailAddress} onChange={hendleChange} name='emailAddress' title='Email Address' type='text' placeholder='Email Address' />
                    <TextInput defaultValue={hr.password} onChange={hendleChange} name='password' title='password' type='text' placeholder='password' />
                    <TextInput defaultValue={hr.mobileNo} onChange={hendleChange} name='mobileNo' title='Mobile No' type='text' placeholder='Mobile No' />
                    <TextInput onChange={hendleChange} name='sex' title='Sex' type='radio'
                        options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]} />
                    <TextInput onChange={hendleSetImage} name='picture' title='Picture' type='file' placeholder='' />
                    <TextInput defaultValue={hr.address} onChange={hendleChange} name='address' title='Address' type='textarea' placeholder='Address' />
                    <TextInput defaultValue={hr.status} onChange={hendleChange} name='status' title='Status' type='radio'
                        options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode ? hendleEditHr : hendleImageUpload} >Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Hr;
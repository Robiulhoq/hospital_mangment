import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import Message from "../../components/Message";
import { DataContext } from "../../ContextApi/DataContext";
import { getCookie } from "../../Utils/getCookie";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";

function AddMedicine({userRole}) {
    const { hendleMedicineUI, editMedicineId, medicineList } = useContext(DataContext);
    const [medicine, setMedicine] = useState({
        medicineName: '',
        description: '',
        price: '',
        manufactured: '',
        status: 'active'
    });

    const hendleChange = (e) => {
        const updateMedicine = { ...medicine }
        updateMedicine[e.target.name] = e.target.value;
        setMedicine(updateMedicine);
    }
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const [loading, setLoading] = useState(false);
    const hendleSaveMedicine = async () => {
        try {
            const values = Object.values(medicine);
            if (values.some(value => !value.trim())) {
                setMessage("Please fill out all fields");
                return;
            }
            setLoading(true);
            const response = await axios.post('https://hospital-mangment.onrender.com/medicine', medicine, {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                response.message = 'Medicine add successfull';
                setMessage(response.message);
                hendleMedicineUI(true);
                setMedicine(prvMedicine => ({
                    ...prvMedicine,
                    medicineName: '',
                    description: '',
                    price: '',
                    manufactured: '',
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
        if (editMedicineId && medicineList) {
            setEditMode(true);
            const editMedicine = medicineList.find(item => item._id === editMedicineId);
            setMedicine(prvMedicine => ({
                ...prvMedicine,
                medicineName: editMedicine.medicineName,
                description: editMedicine.description,
                price: editMedicine.price,
                manufactured: editMedicine.manufactured,
                status: editMedicine.status
            }))
        }
    }, [editMedicineId]);

    const hendleEditMedicine = async () => {
        try {
            const response = await fetch(`https://hospital-mangment.onrender.com/medicine/${editMedicineId}`, {
                method:'PUT',
                body: JSON.stringify(medicine),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                response.message = 'Medicine Edit Successfull';
                setMessage(response.message);
                hendleMedicineUI(true);
            }
        } catch (error) {
            console.log(error);
        }

    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleMedicineUI(false);
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Medicine' />
                <Message message={message} />
                {
                    loading? <Loading />: 
                
                <Activity>
                    <Link to='/medicine/1' ><GreenButton>List Medicine</GreenButton></Link> 
                    <TextInput defaultValue={medicine.medicineName} onChange={hendleChange} name='medicineName' title='Medicine Name' type='text' placeholder='Medicine Name' />
                    <TextInput defaultValue={medicine.description} onChange={hendleChange} name='description' title='Description' type='textarea' placeholder='Description' />
                    <TextInput defaultValue={medicine.price} onChange={hendleChange} name='price' title='Price' type='text' placeholder='price' />
                    <TextInput defaultValue={medicine.manufactured} onChange={hendleChange} name='manufactured' title='Manufactured By' type='text' placeholder='Manufactured By' />
                    <TextInput defaultValue={medicine.status} onChange={hendleChange} name='status' title='status' type='radio' options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode ? hendleEditMedicine : hendleSaveMedicine} >Save</GreenButton>
                </Activity>}
            </Content>
        </Wrapper>
    )
}
export default AddMedicine;
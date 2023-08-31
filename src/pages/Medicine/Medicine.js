import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import Message from "../../components/Message";
import { DataContext } from "../../ContextApi/DataContext";

function AddMedicine() {
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
    const hendleSaveMedicine = async () => {
        try {
            const response = await axios.post('http://localhost:5000/medicine', medicine, {
                headers: { 'Content-Type': 'application/json' }
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
            const response = await fetch(`http://localhost:5000/medicine/${editMedicineId}`, {
                method:'PUT',
                body: JSON.stringify(medicine),
                headers: { 'Content-Type': 'application/json' }
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
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Medicine' />
                <Message message={message} />
                <Activity>
                    <TextInput defaultValue={medicine.medicineName} onChange={hendleChange} name='medicineName' title='Medicine Name' type='text' placeholder='Medicine Name' />
                    <TextInput defaultValue={medicine.description} onChange={hendleChange} name='description' title='Description' type='textarea' placeholder='Description' />
                    <TextInput defaultValue={medicine.price} onChange={hendleChange} name='price' title='Price' type='text' placeholder='price' />
                    <TextInput defaultValue={medicine.manufactured} onChange={hendleChange} name='manufactured' title='Manufactured By' type='text' placeholder='Manufactured By' />
                    <TextInput defaultValue={medicine.status} onChange={hendleChange} name='status' title='status' type='radio' options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode ? hendleEditMedicine : hendleSaveMedicine} >Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AddMedicine;
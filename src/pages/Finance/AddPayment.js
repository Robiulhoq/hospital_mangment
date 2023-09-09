import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
import { getCookie } from "../../Utils/getCookie";

function AddPayment({userRole}) {
    const { accountList, hendlePaymentUI, editPaymentId, paymentList } = useContext(DataContext);
    const [payment, setPayment] = useState({
        date: '',
        accountName: '',
        payTo: '',
        description: '',
        amount: '',
        status: 'active'
    });

    const hendleChange = (e) => {
        const updatePayment = { ...payment }
        updatePayment[e.target.name] = e.target.value;
        setPayment(updatePayment);
    }
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleSavePayment = async () => {
        try {
            const response = await fetch('http://localhost:5000/payment', {
                method: 'POST',
                body: JSON.stringify(payment),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
            });
            if (response.status === 200) {
                response.message = "Payment add successfull!";
                setMessage(response.message);
                hendlePaymentUI(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [editMode, setEditMode] = useState(false);
    useEffect(()=>{
        if(editPaymentId && paymentList){
            setEditMode(true);
            const editPayment = paymentList.find(item => item._id === editPaymentId);
            setPayment(prvPayment =>({
                ...prvPayment,
                date: editPayment.date,
                accountName: editPayment.accountName,
                payTo: editPayment.payTo,
                description: editPayment.description,
                amount: editPayment.amount,
                status: editPayment.status
            }))
        }
    },[editPaymentId])
    const hendleEditPayment =async() =>{
        try {
            const response = await fetch(`http://localhost:5000/payment/${editPaymentId}`, {
                method: 'PUT',
                body: JSON.stringify(payment),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
            });
            if (response.status === 200) {
                response.message = "Payment edit successfull!";
                setMessage(response.message);
                hendlePaymentUI(true);
                setEditMode(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendlePaymentUI(false);
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Payment' />
                <Message message={message} />
                <Activity>
                    <TextInput defaultValue={payment.date} onChange={hendleChange} name='date' type='text' title='Date' placeholder='Date' />
                    <TextInput value={payment.accountName} onChange={hendleChange} name='accountName' type='radio' title='Account Name'
                        options={accountList ? accountList.map(item => ({ label: item.accountName, value: item.accountName })) : null} placeholder='' />
                    <TextInput defaultValue={payment.payTo} onChange={hendleChange} name='payTo' type='text' title='Pay to' placeholder='Pay to' />
                    <TextInput defaultValue={payment.description} onChange={hendleChange} name='description' type='textarea' title='Description' placeholder='Description' />
                    <TextInput defaultValue={payment.amount} onChange={hendleChange} name='amount' type='text' title='Amount' placeholder='Amount *' />
                    <TextInput value={payment.status} onChange={hendleChange} name='status' type='radio' title='Status' placeholder=''
                        options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode? hendleEditPayment: hendleSavePayment} >Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AddPayment;
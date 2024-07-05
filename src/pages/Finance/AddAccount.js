import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
import { getCookie } from "../../Utils/getCookie";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";
function AddService({userRole}) {
    const { editAccoutId, accountList, hendleAccoutUI } = useContext(DataContext);
    const [account, setAddAccount] = useState({
        accountName: '',
        accountType: 'Dabit',
        drescription: '',
        status: 'active'
    });
    console.log(account)
    const hendleChange = (e) => {
        const updateAccount = { ...account }
        updateAccount[e.target.name] = e.target.value;
        setAddAccount(updateAccount);
    }
    const [loading, setLoading] = useState(false);
    console.log(loading);
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleSaveAccount = async () => {
        try {
            const values = Object.values(account);
            if (values.some(value => !value.trim())) {
                setMessage("Please fill out all fields");
                return;
            }
            setLoading(true);
            const response = await fetch('https://hospital-mangment.onrender.com/account', {
                method: 'POST',
                body: JSON.stringify(account),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            
            if (response.status === 200) {
                setLoading(false);
                response.message = 'Account save successfull!';
                setMessage(response.message);
                hendleAccoutUI(true);
                setAddAccount(prvAccount => ({
                    ...prvAccount,
                    accountName: '',
                    accountType: '',
                    drescription: '',
                    status: ''
                }));
                
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (editAccoutId && accountList) {
            const editAccount = accountList.find(item => item._id === editAccoutId)
            console.log(editAccount);

            setAddAccount(prvAccount => ({
                ...prvAccount,
                accountName: editAccount.accountName,
                accountType: editAccount.accountType,
                drescription: editAccount.drescription,
                status: editAccount.status
            }));
            setEditMode(true);
        }
    }, [editAccoutId, accountList]);

    const hendleEditAccount = async () => {
        try {
            const response = await fetch(`https://hospital-mangment.onrender.com/account/${editAccoutId}`, {
                method: 'PUT',
                body: JSON.stringify(account),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                response.message = 'Account Edit successfull!';
                setMessage(response.message);
                hendleAccoutUI(true);
                setAddAccount(prvAccount => ({
                    ...prvAccount,
                    accountName: '',
                    accountType: '',
                    drescription: '',
                    status: ''
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (message) {
        setInterval(() => {
            setMessage('');
            hendleAccoutUI(false);

        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Account' />
                <Message message={message} />
                {
                    loading? <Loading />:
                    <Activity>
                        <Link to='/finance/3' ><GreenButton>List account</GreenButton></Link> 
                    <TextInput name='accountName' defaultValue={account.accountName} onChange={hendleChange} title='Account Name' type='text' placeholder='Account name' />
                    <TextInput name='accountType'  onChange={hendleChange} title='Account Type' type='radio' options={[{ label: 'Dabit', value: 'Dabit' }, { label: 'Credit', value: 'Credit' }]} />
                    <TextInput name='drescription' defaultValue={account.drescription} onChange={hendleChange} title='Drescription' type='textarea' placeholder='Drescription' />
                    <TextInput name='status'  onChange={hendleChange} title='Status' type='radio' options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode ? hendleEditAccount : hendleSaveAccount} >Save</GreenButton>
                </Activity>
                }
                
            </Content>
        </Wrapper>
    )
}
export default AddService;
import React, { useContext, useEffect, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
function AddService() {
    const { editAccoutId, accountList, hendleAccoutUI } = useContext(DataContext);
    const [account, setAddAccount] = useState({
        accountName: '',
        accountType: '',
        drescription: '',
        status: ''
    });
    console.log(account)
    const hendleChange = (e) => {
        const updateAccount = { ...account }
        updateAccount[e.target.name] = e.target.value;
        setAddAccount(updateAccount);
    }
    const [message, setMessage] = useState('')
    const hendleSaveAccount = async () => {
        try {
            const response = await fetch('http://localhost:5000/account', {
                method: 'POST',
                body: JSON.stringify(account),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
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
            const response = await fetch(`http://localhost:5000/account/${editAccoutId}`, {
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
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Account' />
                <Message message={message} />
                <Activity>
                    <TextInput name='accountName' defaultValue={account.accountName} onChange={hendleChange} title='Account Name' type='text' placeholder='Account name' />
                    <TextInput name='accountType'  onChange={hendleChange} title='Account Type' type='radio' options={[{ label: 'Dabit', value: 'Deabit' }, { label: 'Credit', value: 'Credit' }]} />
                    <TextInput name='drescription' defaultValue={account.drescription} onChange={hendleChange} title='Drescription' type='textarea' placeholder='Drescription' />
                    <TextInput name='status'  onChange={hendleChange} title='Status' type='radio' options={[{ label: 'Active', value: 'Active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={editMode ? hendleEditAccount : hendleSaveAccount} >Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AddService;
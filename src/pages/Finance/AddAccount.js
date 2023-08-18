import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function AddService(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Account' />
                <Activity>
                    <TextInput title='Account Name' type='text' placeholder='Account name' />
                    <TextInput title='Account Type' type='radio' options={['Debit', 'credit']} />
                    <TextInput title='Drescription' type='textarea' placeholder='Drescription' />
                    <TextInput title='Status' type='radio' options={['Active', 'Deactive']}/>
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AddService;
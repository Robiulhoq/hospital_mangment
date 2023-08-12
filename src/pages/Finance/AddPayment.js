import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function AddPayment(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Payment' />
                <Activity>
                    <TextInput type='text' title='Date' placeholder='Date' />
                    <TextInput type='radio' title='Account Name' options={['Employ accout', 'Seallary account']} placeholder='' />
                    <TextInput type='text' title='Pay to' placeholder='Pay to' />
                    <TextInput type='textarea' title='Description' placeholder='Description' />
                    <TextInput type='text' title='Amount' placeholder='Amount *' />
                    <TextInput type='radio' title='Status' placeholder='' options={['Active', 'Deactive']} />
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AddPayment;
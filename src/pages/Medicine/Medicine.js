import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function AddMedicine(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Medicine' />
                <Activity>
                        <TextInput title='Medicine Name' type='text' placeholder='Medicine Name'/>
                        <TextInput title='Description' type='textarea' placeholder='Description'/>
                        <TextInput title='Price' type='text' placeholder='price'/>
                        <TextInput title='Manufactured By' type='text' placeholder='Manufactured By'/>
                        <TextInput title='status' type='radio' options={['Active', 'Deactive']}/>
                        <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AddMedicine;
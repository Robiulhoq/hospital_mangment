import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function Appoinment(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Appoinment' />
                <Activity>
                    <TextInput type='text' title='Patient ID' placeholder='Patient ID'  />
                    <TextInput type='radio' title='Department Name ' placeholder='Department Name' options={['....', '...']} />
                    <TextInput type='text' title='Appointment Date *' placeholder='Appointment Date *1'  />
                    <TextInput type='textarea' title='Problem' placeholder='Problem'  />
                    <TextInput type='radio' title='Status' placeholder='Status' options={['active', 'Deactive']} />
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Appoinment;
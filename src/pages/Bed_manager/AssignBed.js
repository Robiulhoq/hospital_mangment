import React from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function AssignBed() {

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Assain Bed' />
                <Activity>
                <TextInput title='Patient ID' type='text' placeholder='Patient Id' />
                    <TextInput title='Bed Type' type='text' placeholder='Bed Type' />
                    <TextInput title='Assain Date' type='text' placeholder='Assain Date' />
                    <TextInput title='Discharge Date' type='text' placeholder='Discharge Date' />
                    <TextInput title='Description' type='textarea' placeholder='Description' />
                    <TextInput title='Status' type='radio' options={['Active', 'Deactive']} />
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AssignBed;
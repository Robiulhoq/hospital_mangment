import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function BedManager(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Bed' />
                <Activity>
                    <TextInput title='Bed Type' type='text' placeholder='Bed Type' />
                    <TextInput title='Description' type='textarea' placeholder='Description' />
                    <TextInput title='Bed Capacity ' type='text' placeholder='Bed Capacity ' />
                    <TextInput title='Charge' type='text' placeholder='Charge' />
                    <TextInput title='Status' type='radio' options={['Active', 'Deactive']} />
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default BedManager;
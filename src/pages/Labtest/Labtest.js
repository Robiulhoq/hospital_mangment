import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function LabTest(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Labtest' />
                <Activity>
                    <TextInput type='text' title='Patient Id' placeholder='Patient Id' />
                    <TextInput type='text' title='Date' placeholder='Date' />
                    <TextInput type='text' title='Title' placeholder='Title' />
                    <TextInput type='textarea' title='Description' placeholder='Description' />
                    <TextInput type='radio' title='Doctor Name' options={['Robiul']} />
                    <TextInput type='radio' title='Status' options={['Active', 'Deactive']} />
                    
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default LabTest;
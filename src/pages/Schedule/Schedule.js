import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function Schedule(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Schedule' />
                <Activity>
                <TextInput type='radio' title='Doctor Name' options={['Rakib', 'Shakib']} />
                <TextInput type='radio' title='Available Days' options={['Rakib', 'Shakib']} />
                <TextInput type='radio' title='Available Time' options={['Rakib', 'Shakib']} />
                <TextInput type='radio' title='Per Patient Time' options={['Rakib', 'Shakib']} />
                <TextInput type='radio' title='Serial Visibility' options={['Rakib', 'Shakib']} />
                <TextInput type='radio' title='Status' options={['Rakib', 'Shakib']} />
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Schedule;
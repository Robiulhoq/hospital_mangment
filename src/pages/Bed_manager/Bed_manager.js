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

                </Activity>
            </Content>
        </Wrapper>
    )
}
export default BedManager;
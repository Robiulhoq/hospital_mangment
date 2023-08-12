import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function ListPayment(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='List Payment' />
                <Activity>

                </Activity>
            </Content>
        </Wrapper>
    )
}
export default ListPayment;
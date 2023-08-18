import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function Hr(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Humen resource' />
                <Activity>
                        <TextInput title='User Role' type='radio' options={['Admin']} />
                        <TextInput title='Fast Name' type='text' placeholder=''/>
                        <TextInput title='Last Name' type='text' placeholder=''/>
                        <TextInput title='Email Address' type='text' placeholder='Email Address'/>
                        <TextInput title='password' type='text' placeholder='password'/>
                        <TextInput title='Mobile No' type='text' placeholder=''/>
                        <TextInput title='Sex' type='radio' options={['Male', 'Female', 'Other']}/>
                        <TextInput title='Picture' type='file' placeholder=''/>
                        <TextInput title='Address' type='textarea' placeholder=''/>
                        <TextInput title='Status' type='radio' options={['Active', 'Deactive']}/>
                        <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Hr;
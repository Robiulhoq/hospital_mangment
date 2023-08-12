import React from 'react'
import './Patient.css';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import TextInput from '../../components/TextInput';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
function Patient() {
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Patient' />
                <Activity>
                    <TextInput type='text' name='name' title='Fast Name' placeholder='Fast name' />
                    <TextInput type='text' title='Last Name' placeholder='Last name' />
                    <TextInput type='text' name='email' title='Email address' placeholder='Email address' />
                    <TextInput type='text' title='Password' placeholder='Password' />
                    <TextInput type='text' title='Mobile No' placeholder='Mobile no' />
                    <TextInput type='radio' title='Blood group' placeholder='Blood grop' options={['A+', 'B+']}/>
                    <TextInput type='text' title='Date of birth' placeholder='Dath of birth' />

                    <TextInput title='Picture' type='file' placeholder='Dath of birth' />
                    <TextInput title='Address' type='textarea' placeholder='Address' />
                    <GreenButton>Save</GreenButton>

                </Activity>
            </Content>
        </Wrapper>
    )
}

export default Patient
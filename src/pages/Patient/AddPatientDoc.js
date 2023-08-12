import React, { useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
function AddPatientDoc() {
    const editorRef = useRef();
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Document' />
                <Activity>
                    <TextInput type='text' name='name' title='Patient ID' placeholder='Patient ID' />
                    <TextInput title='Attatch File' type='file' placeholder='Attatch File' />
                    <TextInput type='radio' options={['abdul kalam', 'shakib']} title='Doctor Name' placeholder='Doctor Name' />
                    <TextInput title='Description' type='textarea' placeholder='Description' />
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}

export default AddPatientDoc;
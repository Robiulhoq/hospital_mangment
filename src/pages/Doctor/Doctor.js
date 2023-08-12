import React, { useState, useRef } from 'react';
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Tinymac from '../../components/Tinymac';
function Doctor() {
    const editorRef = useRef();
    const [inputValue, setInputValue] = useState({
        name: '',
        email: ''
    });
    console.log(inputValue);
    const hendleChange = (e) => {
        const value = { ...inputValue }
        value[e.target.name] = e.target.value;
        setInputValue(value);
    }
    const hendletinySubmit = () => {
        console.log(editorRef.current.getContent());
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Doctor' />
                <Activity>
                    <TextInput type='text' title='Fast Name' placeholder='Fast name' />
                    <TextInput type='text' title='Last Name' placeholder='Last name' />
                    <TextInput type='text' title='Email Name' placeholder='Email name' />
                    <TextInput type='text' title='Password' placeholder='Password' />
                    <TextInput type='text' title='Designation' placeholder='Designation' />
                    <TextInput type='textarea' title='Address' placeholder='Address' />
                    <TextInput type='text' title='Phone No' placeholder='Phone No' />
                    <Tinymac title='Short Biography' />
                    <TextInput type='file' title='Picture' placeholder='Phone No' />
                    <TextInput type='text' title='Specialist' placeholder='Specialist' />
                    <TextInput type='text' title='Dath of Birth' placeholder='Dath of Birth' />
                    <TextInput type='radio' title='Sex' options={['Male', 'Female']} />
                    <TextInput type='radio' title='Bloud Group' options={['Male', 'Female']} />
                    <Tinymac title='Education/Degree' />
                    <TextInput type='radio' title='Status' options={['Male', 'Female']} />
                    <GreenButton onClick={hendletinySubmit}>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}

export default Doctor
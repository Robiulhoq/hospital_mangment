import React from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import TextInput from '../../components/TextInput';
import { Wrapper, SidebarContainer, Content, Activity} from '../../components/Common';
import { BlueButton, GreenButton} from '../../components/Buttons';
const Department = () => {
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            
            
            <Content>  
            <TopBar title='Add Department' />
        <Activity>
                <BlueButton>Depratment List</BlueButton>
                    <TextInput title="Department Name" placeholder='Department Name' type='text'/>
                    <TextInput title="Department Name" type='textarea'/>
                    <TextInput title="status" type='radio' options={['active', 'deactive']}/>
                <GreenButton>Save</GreenButton>
           
        </Activity>
        </Content>
        </Wrapper>
    )
}

export default Department;